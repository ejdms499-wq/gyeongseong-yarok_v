/* ════════════════════════════════════════════════════════════════
   경성야록 · 독자 등록 설정  (적용방법 안내서 4단계에서 이 두 줄만 채우면 됨)
   - 비워 두면 「시연 모드」: 그 컴퓨터 안에서만 가입·錢·방꾸미기가 돌아감 (발표용)
   - 채우면 Supabase 로 진짜 가입 · 카카오 · 네이버 입장
   ※ anon key 는 공개해도 되는 열쇠요 (service_role 키는 절대 넣지 마시오)
   ════════════════════════════════════════════════════════════════ */
window.YK_CONFIG = {
  SUPABASE_URL: '',        // 예: 'https://abcdefgh.supabase.co'
  SUPABASE_ANON_KEY: '',   // 예: 'eyJhbGciOi...' (Project Settings > API 의 anon public)
  KAKAO: true,             // 카카오 입장 단추 보이기
  NAVER: true              // 네이버 입장 단추 보이기 (Supabase 에 custom:naver 를 만든 뒤)
};
