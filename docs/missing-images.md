# 모바일 사건 페이지 누락 이미지 목록

본 문서는 모바일 사건 페이지(`cases/*/m.html`)에서 현재 파일이 없어 로드되지 않는 이미지 목록을 정리한 문서입니다.
해당 이미지 칸(`.mb-fig`, `.mb-doc`, `figure`)은 인라인 스크립트를 통해 에러 발생 시 자동으로 숨김 처리(`display: none`)되며, 향후 에셋이 제작되어 경로에 추가되면 코드 수정 없이 자동으로 다시 표시됩니다.

---

## 1. 죽첨정 단도 살인사건 (`cases/jukcheomjeong/m.html`)

| 파일 경로 | 태그 / 마크업 위치 (줄번호) | 분류 | 설명 / 비고 |
|---|---|---|---|
| `img/rec_donga19330517.jpg` | `<button class="mb-doc">` (75~76줄) | 실제 신문 스캔 | 1933년 5월 17일 동아일보 기사 자료 |
| `img/jk_time_clock.jpg` | `<figure class="mb-fig">` (132줄) | 재현 그림 | 죽첨정 사건 시간대 괘종시계 |
| `img/rec_donga19330603.jpg` | `<button class="mb-doc">` (165~166줄) | 실제 신문 스캔 | 1933년 6월 3일 동아일보 기사 자료 |
| `img/jk_extra_paste.jpg` | `<figure class="mb-fig">` (192줄) | 재현 그림 | 호외 벽보 풀칠/부착 재현 |
| `img/jk_corridor.jpg` | `<figure class="mb-fig">` (225줄) | 재현 그림 | 복도 전경 |
| `img/rec_donga19330608.jpg` | `<button class="mb-doc">` (226~227줄) | 실제 신문 스캔 | 1933년 6월 8일 동아일보 기사 자료 |
| `img/jk_rec_desk.jpg` | `<figure class="mb-fig">` (297줄) | 재현 그림 | 취조실/기록 데스크 |
| `img/rec_sindonga193307.jpg` | `<button class="mb-doc">` (308~309줄) | 실제 신문 스캔 | 1933년 7월 신동아 기사 자료 |
| `img/jk_door_pot.jpg` | `<figure class="mb-fig">` (326줄) | 재현 그림 | 문 앞 화분/장독 |

> **참고 (배경 그림 data-lbg)**:
> - `cases/jukcheomjeong/img/radio-room.jpg` (284줄) — `data-lbg` 속성으로 지정된 배경으로, 칸 숨김 대상이 아니며 배경만 미출력 상태로 유지됨.

---

## 2. 마리아의 심판 (`cases/maria/m.html`)

| 파일 경로 | 태그 / 마크업 위치 (줄번호) | 분류 | 설명 / 비고 |
|---|---|---|---|
| `img/mr_plan_paper.jpg` | `<figure class="mb-fig">` (129줄) | 재현 그림 | 계획서/도면 메모 |
| `img/mr_letter.jpg` | `<figure class="mb-fig">` (244줄) | 재현 그림 | 편지 봉투/서신 재현 |
| `img/mr_cinema.jpg` | `<figure class="mb-fig">` (342줄) | 재현 그림 | 극장 전경 |
| `img/rec_donga19331110.jpg` | `<button class="mb-doc">` (343~344줄) | 실제 신문 스캔 | 1933년 11월 10일 동아일보 기사 자료 |
| `img/mr_court2.jpg` | `<figure class="mb-fig">` (377줄) | 재현 그림 | 법정 전경 2 |
| `img/rec_jungang193403.jpg` | `<button class="mb-doc">` (378~379줄) | 실제 신문 스캔 | 1934년 3월 조선중앙일보 기사 자료 |

> **참고 (배경 그림 data-lbg)**:
> - `cases/maria/img/letter1_m.png` (237줄) — `data-lbg` 속성 배경.
> - `cases/maria/img/radio-room.jpg` (454줄) — `data-lbg` 속성 배경.

---

## 3. 베를린의 월계관: 손기정 (`cases/sonkijeong/m.html`)

| 파일 경로 | 태그 / 마크업 위치 (줄번호) | 분류 | 설명 / 비고 |
|---|---|---|---|
| `img/19360813_page.jpg` | `<button class="mb-doc">` (127~128줄) | 실제 신문 스캔 | 1936-08-13 동아일보 지방판 2면 (※ 조선중앙일보 에셋과 혼동 금지) |
| `img/19360813_photo.jpg` | `<button class="mb-doc">` (130~131줄) | 실제 신문 스캔 | 동아일보 손기정 시상대 사진 (※ 조선중앙일보 에셋과 혼동 금지) |
| `img/sk_jungang_door.jpg` | `<figure class="mb-fig">` (134줄) | 재현 그림 | 중앙일보사 문 앞 |
| `img/sk_night_room.jpg` | `<figure class="mb-fig">` (231줄) | 재현 그림 | 밤의 방/숙소 |
| `img/sk_gate_night.jpg` | `<figure class="mb-fig">` (232줄) | 재현 그림 | 밤의 교문/정문 |
| `img/sk_oath.jpg` | `<figure class="mb-fig">` (234줄) | 재현 그림 | 맹세/다짐 장면 |
| `img/rec_court19360828.jpg` | `<button class="mb-doc">` (235~236줄) | 실제 법원/신문 문서 | 1936년 8월 28일 법원/공문서 |
| `img/rec_police19360829.jpg` | `<button class="mb-doc">` (272~273줄) | 실제 경찰 문서 | 1936년 8월 29일 경기도경찰부 문서 |
| `img/sk_gate_night3.jpg` | `<figure class="mb-fig">` (286줄) | 재현 그림 | 밤의 교문 3 |
| `img/sk_press_roll.jpg` | `<figure class="mb-fig">` (300줄) | 재현 그림 | 윤전기 롤 |
| `img/rec_finish_sign.jpg` | `<button class="mb-doc">` (322~323줄) | 실제 사진/서명 | 손기정 선수 서명/피니시 사진 |

> **참고 (배경 그림 data-lbg)**:
> - `cases/sonkijeong/img/sk_night_room2.jpg` (207줄) — `data-lbg` 속성 배경.
> - `cases/sonkijeong/img/radio-room.jpg` (362줄) — `data-lbg` 속성 배경.

---

## 4. 백백교의 비밀 (`cases/baekbaekgyo/m.html`)

| 파일 경로 | 태그 / 마크업 위치 (줄번호) | 분류 | 설명 / 비고 |
|---|---|---|---|
| `img/case/bb_empty_seat.jpg` | `<figure class="mb-fig">` (70, 355줄) | 재현 그림 | 빈 좌석 재현 |
| `img/case/bb_leader_room.jpg` | `<figure class="mb-fig">` (104줄) | 재현 그림 | 교주 거처/내실 재현 |
| `img/case/bb_obituary.jpg` | `<figure class="mb-fig">` (139줄) | 재현 그림 | 부고/사망 통지문 |
| `img/case/bb_telegraph.jpg` | `<figure class="mb-fig">` (218줄) | 재현 그림 | 전신/전보 기기 |
| `img/case/bb_shovel.jpg` | `<figure class="mb-fig">` (281줄) | 재현 그림 | 삽/발굴 도구 |
