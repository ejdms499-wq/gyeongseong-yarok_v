-- ════════════════════════════════════════════════════════════════
--  경성야록 · 독자 등록 데이터베이스 (Supabase)
--  발표 자료 「데이터 구조」 그대로:
--    profiles 회원 프로필 · shop_items 상점 물건 · owned_items 가진 물건 · room_layout 독자의 방 배치
--    서버 기능 buy_item 물건 사기 · claim_read 사건 읽음 보상 · demo_charge 시연 충전
--  쓰는 법: Supabase 대시보드 → SQL Editor → New query → 이 파일 전체 붙여 넣기 → Run
--  여러 번 실행해도 안전함 (있으면 건너뜀 · 물건 값은 새로 맞춤)
-- ════════════════════════════════════════════════════════════════

-- 1) 회원 프로필 ───────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nickname    text not null default '무명 독자' check (char_length(nickname) between 1 and 20),
  coins       integer not null default 300 check (coins >= 0),
  read_cases  text[] not null default '{}',          -- 완독한 사건 (보상 한 번만)
  created_at  timestamptz not null default now()
);

-- 2) 상점 물건 ─────────────────────────────────────────────────
create table if not exists public.shop_items (
  id     text primary key,
  name   text not null,
  price  integer not null default 0 check (price >= 0),
  kind   text not null check (kind in ('lamp','wall','desk','scrap'))
);

-- 3) 가진 물건 ─────────────────────────────────────────────────
create table if not exists public.owned_items (
  user_id     uuid not null references public.profiles(id) on delete cascade,
  item_id     text not null references public.shop_items(id),
  acquired_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

-- 4) 독자의 방 배치 ────────────────────────────────────────────
create table if not exists public.room_layout (
  user_id     uuid primary key references public.profiles(id) on delete cascade,
  layout      jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- 상점 진열품 (사이트 m/yk-auth.js 의 ITEMS 와 같은 값) ───────────
insert into public.shop_items (id, name, price, kind) values
  ('lamp_amber','호롱불',0,'lamp'), ('lamp_moon','달빛 창',120,'lamp'), ('lamp_red','붉은 등피',180,'lamp'),
  ('ad_ajino','아지노모도',30,'wall'), ('ad_calpis','칼피스',30,'wall'), ('ad_club','구라부 백분',30,'wall'),
  ('ad_lion','라이온 치약',30,'wall'), ('ad_morinaga','모리나가',30,'wall'), ('ad_pilot','파일롯 만년필',30,'wall'),
  ('ad_radio','라디오',30,'wall'), ('ad_utena','우테나',30,'wall'),
  ('o_match','성냥갑',40,'desk'), ('o_pen','만년필',60,'desk'), ('o_box','낡은 나무 상자',70,'desk'),
  ('o_mirror','깨진 손거울',90,'desk'), ('o_watch','회중시계',120,'desk'), ('o_clock','괘종시계',200,'desk'),
  ('o_doll','인형 머리',250,'desk'), ('o_cat','활자 고양이',300,'desk'),
  ('scrap_jk','죽첨정 스크랩',0,'scrap'), ('scrap_maria','마리아 스크랩',0,'scrap'),
  ('scrap_sk','손기정 스크랩',0,'scrap'), ('scrap_bb','백백교 스크랩',0,'scrap')
on conflict (id) do update set name = excluded.name, price = excluded.price, kind = excluded.kind;

-- 가입하면 프로필 자동 생성 (닉네임은 가입할 때 쓴 것, 처음 300錢) ──
create or replace function public.handle_new_reader()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, coalesce(nullif(left(trim(new.raw_user_meta_data->>'nickname'), 20), ''),
                           nullif(left(trim(new.raw_user_meta_data->>'name'), 20), ''), '무명 독자'))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_reader();

-- 권한: 자기 것만 보고, 錢은 서버 기능으로만 바뀜 ──────────────────
alter table public.profiles    enable row level security;
alter table public.shop_items  enable row level security;
alter table public.owned_items enable row level security;
alter table public.room_layout enable row level security;

drop policy if exists "내 프로필 보기" on public.profiles;
create policy "내 프로필 보기" on public.profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "내 닉네임 고치기" on public.profiles;
create policy "내 닉네임 고치기" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
revoke update on public.profiles from anon, authenticated;
grant  update (nickname) on public.profiles to authenticated;     -- 錢 · 완독 기록은 직접 못 고침

drop policy if exists "진열품 누구나 보기" on public.shop_items;
create policy "진열품 누구나 보기" on public.shop_items for select to anon, authenticated using (true);

drop policy if exists "내 물건 보기" on public.owned_items;
create policy "내 물건 보기" on public.owned_items for select to authenticated using (auth.uid() = user_id);

drop policy if exists "내 방 보기" on public.room_layout;
create policy "내 방 보기" on public.room_layout for select to authenticated using (auth.uid() = user_id);
drop policy if exists "내 방 처음 꾸미기" on public.room_layout;
create policy "내 방 처음 꾸미기" on public.room_layout for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "내 방 다시 꾸미기" on public.room_layout;
create policy "내 방 다시 꾸미기" on public.room_layout for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 서버 기능 1 · 물건 사기 ───────────────────────────────────────
create or replace function public.buy_item(p_item text)
returns integer language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_price int; v_coins int;
begin
  if v_uid is null then raise exception '입장하신 뒤 사시오'; end if;
  select price into v_price from shop_items where id = p_item and kind <> 'scrap';
  if v_price is null then raise exception '그런 물건은 업소'; end if;
  if exists (select 1 from owned_items where user_id = v_uid and item_id = p_item) then
    raise exception '이미 가진 물건이오';
  end if;
  select coins into v_coins from profiles where id = v_uid for update;
  if v_coins is null then raise exception '독자 등록부터 하시오'; end if;
  if v_coins < v_price then raise exception '錢이 모자라오'; end if;
  update profiles set coins = coins - v_price where id = v_uid returning coins into v_coins;
  insert into owned_items (user_id, item_id) values (v_uid, p_item);
  return v_coins;
end $$;

-- 서버 기능 2 · 사건 끝까지 읽으면 50錢 + 그 사건 스크랩 (사건마다 한 번) ──
create or replace function public.claim_read(p_case text)
returns integer language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_coins int;
begin
  if v_uid is null then raise exception '입장하신 뒤 받으시오'; end if;
  if p_case not in ('jk','maria','sk','bb') then raise exception '그런 사건은 업소'; end if;
  select coins into v_coins from profiles where id = v_uid for update;
  if v_coins is null then raise exception '독자 등록부터 하시오'; end if;
  if p_case = any (select unnest(read_cases) from profiles where id = v_uid) then return v_coins; end if;
  update profiles set coins = coins + 50, read_cases = array_append(read_cases, p_case)
   where id = v_uid returning coins into v_coins;
  insert into owned_items (user_id, item_id) values (v_uid, 'scrap_' || p_case) on conflict do nothing;
  return v_coins;
end $$;

-- 서버 기능 3 · 시연 충전 (발표용 · 실제 결제 없음) ─────────────────
create or replace function public.demo_charge(p_pack text)
returns integer language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_add int; v_coins int;
begin
  if v_uid is null then raise exception '입장하신 뒤 충전하시오'; end if;
  v_add := case p_pack when 'p100' then 100 when 'p500' then 550 when 'p1200' then 1400 end;
  if v_add is null then raise exception '그런 꾸러미는 업소'; end if;
  update profiles set coins = coins + v_add where id = v_uid returning coins into v_coins;
  if v_coins is null then raise exception '독자 등록부터 하시오'; end if;
  return v_coins;
end $$;

revoke all on function public.buy_item(text), public.claim_read(text), public.demo_charge(text) from public, anon;
grant execute on function public.buy_item(text), public.claim_read(text), public.demo_charge(text) to authenticated;
