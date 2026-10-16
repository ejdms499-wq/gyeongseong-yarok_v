-- ════════════════════════════════════════════════════════════════
--  경성야록 · 독자 등록 / 독자의 방 / 錢  (Supabase SQL Editor 에 통째로 붙여 넣고 Run)
--  여러 번 실행해도 괜찮게 짜 두었소.
-- ════════════════════════════════════════════════════════════════

-- 1. 독자 (가입하면 저절로 한 줄 생김)
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  nickname    text not null default '무명 독자',
  coins       integer not null default 0 check (coins >= 0),
  created_at  timestamptz not null default now()
);

-- 2. 상점 진열품 (값은 여기서만 정함 → 화면에서 값을 고쳐도 소용없음)
create table if not exists public.shop_items (
  id     text primary key,
  name   text not null,
  price  integer not null check (price >= 0),
  kind   text not null            -- wall(벽) / desk(책상) / scrap(사건 스크랩, 파는 물건 아님) / lamp(등불) / sub(구독: sub_all 월정 · dan_사건 한 장)
);

-- 3. 독자가 가진 물건
create table if not exists public.owned_items (
  user_id      uuid not null references auth.users on delete cascade,
  item_id      text not null references public.shop_items(id),
  acquired_at  timestamptz not null default now(),
  primary key (user_id, item_id)
);

-- 4. 방 배치 (어디에 무엇을 놓았나)
create table if not exists public.room_layout (
  user_id     uuid primary key references auth.users on delete cascade,
  layout      jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- 5. 錢 장부 (들고 난 기록)
create table if not exists public.coin_ledger (
  id          bigserial primary key,
  user_id     uuid not null references auth.users on delete cascade,
  delta       integer not null,
  reason      text not null,
  created_at  timestamptz not null default now()
);

-- 6. 사건 완독 적립 (사건마다 한 번만)
create table if not exists public.read_rewards (
  user_id   uuid not null references auth.users on delete cascade,
  case_id   text not null,
  primary key (user_id, case_id)
);

-- ── 잠금 (자기 것만 보고, 錢은 아래 함수로만 바뀜) ──
alter table public.profiles     enable row level security;
alter table public.shop_items   enable row level security;
alter table public.owned_items  enable row level security;
alter table public.room_layout  enable row level security;
alter table public.coin_ledger  enable row level security;
alter table public.read_rewards enable row level security;

drop policy if exists "내 독자 정보 보기" on public.profiles;
create policy "내 독자 정보 보기" on public.profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "내 필명 고치기" on public.profiles;
create policy "내 필명 고치기" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
revoke update on public.profiles from authenticated, anon;
grant  update (nickname) on public.profiles to authenticated;      -- 錢(coins)은 직접 못 고침

drop policy if exists "진열품 보기" on public.shop_items;
create policy "진열품 보기" on public.shop_items for select to anon, authenticated using (true);

drop policy if exists "내 물건 보기" on public.owned_items;
create policy "내 물건 보기" on public.owned_items for select to authenticated using (auth.uid() = user_id);

drop policy if exists "내 방 보기" on public.room_layout;
create policy "내 방 보기" on public.room_layout for select to authenticated using (auth.uid() = user_id);
drop policy if exists "내 방 처음 꾸미기" on public.room_layout;
create policy "내 방 처음 꾸미기" on public.room_layout for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "내 방 고치기" on public.room_layout;
create policy "내 방 고치기" on public.room_layout for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "내 장부 보기" on public.coin_ledger;
create policy "내 장부 보기" on public.coin_ledger for select to authenticated using (auth.uid() = user_id);

drop policy if exists "내 완독 보기" on public.read_rewards;
create policy "내 완독 보기" on public.read_rewards for select to authenticated using (auth.uid() = user_id);

-- ── 가입하면: 독자 한 줄 + 입장 축하 300錢 ──
create or replace function public.handle_new_reader()
returns trigger language plpgsql security definer set search_path = public as $$
declare nick text;
begin
  nick := coalesce(nullif(new.raw_user_meta_data->>'nickname',''),
                   nullif(new.raw_user_meta_data->>'name',''),
                   nullif(new.raw_user_meta_data->>'full_name',''),
                   nullif(new.raw_user_meta_data->>'preferred_username',''),
                   '무명 독자');
  insert into public.profiles (id, nickname, coins) values (new.id, left(nick, 20), 300)
  on conflict (id) do nothing;
  insert into public.coin_ledger (user_id, delta, reason) values (new.id, 300, '입장 축하');
  return new;
end $$;

drop trigger if exists on_auth_user_created_yk on auth.users;
create trigger on_auth_user_created_yk after insert on auth.users
  for each row execute function public.handle_new_reader();

-- ── 물건 사기 ──
create or replace function public.buy_item(p_item text)
returns integer language plpgsql security definer set search_path = public as $$
declare it record; left_coins integer;
begin
  if auth.uid() is null then raise exception '먼저 입장하시오'; end if;
  select * into it from public.shop_items where id = p_item;
  if not found then raise exception '그런 물건은 업소'; end if;
  if it.kind = 'scrap' then raise exception '스크랩은 사건을 읽어야 생기오'; end if;
  if exists (select 1 from public.owned_items where user_id = auth.uid() and item_id = p_item) then
    raise exception '이미 가진 물건이오';
  end if;
  update public.profiles set coins = coins - it.price
    where id = auth.uid() and coins >= it.price
    returning coins into left_coins;
  if left_coins is null then raise exception '錢이 모자라오'; end if;
  insert into public.owned_items (user_id, item_id) values (auth.uid(), p_item);
  insert into public.coin_ledger (user_id, delta, reason) values (auth.uid(), -it.price, '구입 · ' || it.name);
  return left_coins;
end $$;

-- ── 사건을 끝까지 읽으면: 50錢 + 그 사건 스크랩 (사건마다 한 번) ──
create or replace function public.claim_read(p_case text)
returns integer language plpgsql security definer set search_path = public as $$
declare got integer; c integer;
begin
  if auth.uid() is null then raise exception '먼저 입장하시오'; end if;
  if p_case not in ('jk','maria','sk','bb') then raise exception '그런 사건은 업소'; end if;
  insert into public.read_rewards (user_id, case_id) values (auth.uid(), p_case) on conflict do nothing;
  get diagnostics got = row_count;
  if got = 1 then
    update public.profiles set coins = coins + 50 where id = auth.uid();
    insert into public.owned_items (user_id, item_id) values (auth.uid(), 'scrap_' || p_case) on conflict do nothing;
    insert into public.coin_ledger (user_id, delta, reason) values (auth.uid(), 50, '완독 · ' || p_case);
  end if;
  select coins into c from public.profiles where id = auth.uid();
  return c;
end $$;

-- ── 錢 충전 (시험용 · 실제로 돈이 나가지 않음) ──
--   실제 결제를 붙일 때는 이 함수를 지우고, 결제 회사(예: 토스페이먼츠)의 승인 확인 뒤에만 錢을 넣도록 바꿀 것
create or replace function public.demo_charge(p_pack text)
returns integer language plpgsql security definer set search_path = public as $$
declare amt integer; c integer;
begin
  if auth.uid() is null then raise exception '먼저 입장하시오'; end if;
  amt := case p_pack when 'p100' then 100 when 'p500' then 550 when 'p1200' then 1400 else null end;
  if amt is null then raise exception '그런 꾸러미는 업소'; end if;
  update public.profiles set coins = coins + amt where id = auth.uid() returning coins into c;
  insert into public.coin_ledger (user_id, delta, reason) values (auth.uid(), amt, '시험 충전 · ' || p_pack);
  return c;
end $$;

revoke all on function public.buy_item(text), public.claim_read(text), public.demo_charge(text) from public, anon;
grant execute on function public.buy_item(text), public.claim_read(text), public.demo_charge(text) to authenticated;

-- ── 진열품 목록 (값을 바꾸려면 여기 숫자만 고쳐서 다시 Run) ──
insert into public.shop_items (id, name, price, kind) values
  ('lamp_amber', '호롱불 (기본)',           0,   'lamp'),
  ('lamp_moon',  '달빛 창',                 120, 'lamp'),
  ('lamp_red',   '붉은 등피',               180, 'lamp'),
  ('ad_ajino',   '광고 엽서 · 아지노모도',   30,  'wall'),
  ('ad_calpis',  '광고 엽서 · 칼피스',       30,  'wall'),
  ('ad_club',    '광고 엽서 · 구라부 백분',   30,  'wall'),
  ('ad_lion',    '광고 엽서 · 라이온 치약',   30,  'wall'),
  ('ad_morinaga','광고 엽서 · 모리나가',      30,  'wall'),
  ('ad_pilot',   '광고 엽서 · 파일롯 만년필', 30,  'wall'),
  ('ad_radio',   '광고 엽서 · 라디오',       30,  'wall'),
  ('ad_utena',   '광고 엽서 · 우테나',       30,  'wall'),
  ('o_pen',      '만년필',                  60,  'desk'),
  ('o_match',    '성냥갑',                  40,  'desk'),
  ('o_mirror',   '깨진 손거울',              90,  'desk'),
  ('o_watch',    '회중시계',                120, 'desk'),
  ('o_clock',    '괘종시계',                200, 'desk'),
  ('o_box',      '낡은 나무 상자',            70,  'desk'),
  ('o_cat',      '활자 고양이',              300, 'desk'),
  ('o_doll',     '인형 머리',                250, 'desk'),
  ('scrap_jk',   '스크랩 · 죽첨정',          0,   'scrap'),
  ('scrap_maria','스크랩 · 마리아',          0,   'scrap'),
  ('scrap_sk',   '스크랩 · 손기정',          0,   'scrap'),
  ('scrap_bb',   '스크랩 · 백백교',          0,   'scrap'),
  ('sub_all', '월정 구독', 100, 'sub'),
  ('dan_kim-jeongpil', '단신 한 장', 5, 'sub'),
  ('dan_jangjinhong', '단신 한 장', 5, 'sub'),
  ('dan_jungang-boyuk', '단신 한 장', 5, 'sub'),
  ('dan_bankbokchang', '단신 한 장', 5, 'sub'),
  ('dan_hyeonhaetan', '단신 한 장', 5, 'sub'),
  ('dan_hyeonjingeon', '단신 한 장', 5, 'sub'),
  ('dan_geumgwanchong', '단신 한 장', 5, 'sub')
on conflict (id) do update set name = excluded.name, price = excluded.price, kind = excluded.kind;
