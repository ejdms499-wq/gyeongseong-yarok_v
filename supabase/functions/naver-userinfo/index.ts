// 경성야록 · 네이버 로그인 중계
// 네이버는 사용자 정보를 { response: { id, email, nickname ... } } 처럼 한 겹 안에 담아 보내서
// Supabase 가 그대로는 못 읽음 → 이 함수가 한 겹 벗겨서 { sub, email, name ... } 로 돌려줌.
// Supabase 대시보드 > Edge Functions 에서 이름 naver-userinfo 로 만들고, "Verify JWT" 는 끔(OFF).
Deno.serve(async (req: Request) => {
  const auth = req.headers.get("Authorization") ?? "";
  const r = await fetch("https://openapi.naver.com/v1/nid/me", { headers: { Authorization: auth } });
  const j = await r.json().catch(() => ({}));
  const p = (j && j.response) || {};
  if (!r.ok || j.resultcode !== "00" || !p.id) {
    return new Response(JSON.stringify({ error: "naver_userinfo_failed", detail: j }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
  const out = {
    sub: String(p.id),
    id: String(p.id),
    email: p.email ?? null,
    email_verified: !!p.email,
    name: p.nickname || p.name || "네이버 독자",
    nickname: p.nickname || p.name || "네이버 독자",
    picture: p.profile_image ?? null,
  };
  return new Response(JSON.stringify(out), { headers: { "content-type": "application/json" } });
});
