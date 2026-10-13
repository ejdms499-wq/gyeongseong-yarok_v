/* Drying room side puzzle. Completing all differences reveals the final photograph and ends the game. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GyeongMissingPerson=api;})(typeof window==='object'?window:globalThis,function(){
'use strict';
const DIFFERENCES=[{mark:'押收',x:78,y:16,hint:'건조 사진 오른쪽 위에 새로 찍힌 압수 도장을 찾아보세요.'},{mark:'24',x:15,y:82,hint:'건조 사진 왼쪽 아래에 새로 적힌 숫자 24를 찾아보세요.'},{mark:'×',x:53,y:18,hint:'건조 사진 위쪽 가운데에 새로 생긴 × 표시를 찾아보세요.'}];
const PHOTO_URLS=(typeof window==='object'&&window.GYEONG_MP_PHOTOS&&window.GYEONG_MP_PHOTOS.length===3)?window.GYEONG_MP_PHOTOS:[1,2,3].map(n=>'../mobile-expansion/assets/missing-person/photo-'+n+'.png');
const CREDIT='이 사진은 ai생성 이미지 입니다.';
class Puzzle{
 constructor(){this.found=new Set();this.teaserSeen=false;this.lastPhoto=null;}
 choose(photo,person){if(!Number.isInteger(photo)||photo<0||photo>2||person!=='difference')return false;if(!this.found.has(photo))this.lastPhoto=photo;this.found.add(photo);return true;}
 get solved(){return this.found.size===3;}
}
/* 엔딩 (1013) : 화면이 붉게 세 번 점멸 → 「게임 종료」 → 신문(본지)으로 돌아감. 게임 화면은 완전히 끝남 */
function endGame(game){
 if(document.getElementById('gm-ending'))return;
 try{game.soundManager&&game.soundManager.ctx&&game.soundManager.ctx.suspend&&game.soundManager.ctx.suspend();}catch(e){}
 try{game.playerControls?.controls.unlock();}catch(e){}
 try{if(game.renderer&&game.renderer.setAnimationLoop)game.renderer.setAnimationLoop(null);}catch(e){}
 document.querySelectorAll('audio,video').forEach(m=>{try{m.pause();}catch(e){}});
 const st=document.createElement('style');st.textContent='#gm-ending{position:fixed;inset:0;z-index:2147483600;background:#000;display:grid;place-items:center;pointer-events:all;cursor:default}'+
  '#gm-ending .rd{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#c4120c,#5a0503 70%,#1a0000);opacity:0;animation:gmRed 2.1s ease-in-out both}'+
  '@keyframes gmRed{0%{opacity:0}10%{opacity:.95}22%{opacity:.15}36%{opacity:.95}48%{opacity:.15}62%{opacity:1}100%{opacity:0}}'+
  '#gm-ending .tx{position:relative;text-align:center;color:#e9dcc2;font-family:"Nanum Myeongjo","Noto Serif KR",serif;opacity:0;animation:gmTx 1.2s ease 2.1s both}'+
  '#gm-ending .tx b{display:block;font-size:clamp(34px,6vw,64px);font-weight:800;letter-spacing:.32em;padding-left:.32em;color:#f0e2c6}'+
  '#gm-ending .tx small{display:block;margin-top:18px;font-size:clamp(13px,1.6vw,16px);letter-spacing:.3em;color:#a8957a}'+
  '@keyframes gmTx{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}'+
  '@media(prefers-reduced-motion:reduce){#gm-ending .rd{animation:gmRedS 2.1s both}@keyframes gmRedS{0%,100%{opacity:0}30%,70%{opacity:.8}}}';
 document.head.appendChild(st);
 const o=document.createElement('div');o.id='gm-ending';o.setAttribute('role','alert');o.innerHTML='<i class="rd"></i><p class="tx"><b>게임 종료</b><small>신문으로 돌아갑니다</small></p>';
 document.body.appendChild(o);
 /* 빨간 점멸과 함께 낮은 울림 */
 try{const A=window.AudioContext||window.webkitAudioContext,ac=new A(),t=ac.currentTime;[0,.5,1.05].forEach(d=>{const os=ac.createOscillator(),g=ac.createGain();os.type='sine';os.frequency.setValueAtTime(70,t+d);os.frequency.exponentialRampToValueAtTime(32,t+d+.4);g.gain.setValueAtTime(.0001,t+d);g.gain.exponentialRampToValueAtTime(.9,t+d+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d+.45);os.connect(g);g.connect(ac.destination);os.start(t+d);os.stop(t+d+.5);});}catch(e){}
 window.addEventListener('keydown',e=>{e.preventDefault();e.stopImmediatePropagation();},{capture:true});
 setTimeout(()=>{location.href='../index.html';},4600);
}
function canEnd(space){return Boolean(space.archive?.unlocked&&space.archive?.solved&&space.developed&&space.missingPerson.solved);}
function render(space,index){
 const game=space.game,state=space.missingPerson,view=game.inspectViewRenderer.viewContainer;game.inspectViewRenderer.actionBar.replaceChildren();view.replaceChildren();game.interactionManager.inspectTagEl.textContent='乾燥室 · 초록 단서';
 const panel=document.createElement('section');panel.className='gm-expansion mp-puzzle';view.appendChild(panel);
 const h=document.createElement('h2');h.textContent='사진 속 달라진 흔적 · 틀린그림 찾기';panel.appendChild(h);
 const touch=document.createElement('p');touch.className='mp-touch-guide';touch.textContent=navigator.maxTouchPoints>0?'모바일: 사진을 향해 조사 버튼을 누르고, 원본과 비교해 건조 사진의 달라진 곳을 터치하세요. 설명은 위아래로 스크롤할 수 있어요.':'사진을 조사한 뒤 원본과 건조 사진을 비교하세요.';panel.appendChild(touch);
 const help=document.createElement('p');help.className='gp-hints';help.textContent='초록 집게 사진 ① 입구 왼쪽 → ② 가운데 왼쪽 → ③ 안쪽 왼쪽. 각 사진의 원본과 건조본을 비교해 추가된 흔적 한 곳을 찾으세요. 잘못 골라도 다시 선택할 수 있어요.';panel.appendChild(help);
 const progress=document.createElement('p');progress.setAttribute('role','status');progress.textContent=`찾은 사진 ${state.found.size}/3`;panel.appendChild(progress);
 if(state.solved&&!canEnd(space)){h.textContent='사진 퍼즐을 모두 해결했습니다.';help.textContent='엔딩까지 남은 필수 퍼즐: '+[!space.archive?.unlocked?'식자실 24번 서랍':null,!space.archive?.solved?'자료실 날짜 스탬프':null,!space.developed?'암실 사진 현상':null].filter(Boolean).join(' · ')+'. 앞선 퍼즐을 완료한 뒤 사진을 다시 조사하세요.';return;}
 if(state.solved){
  space.refreshNotice();space.removeMissingPerson();
  h.textContent='모든 퍼즐을 해결했습니다.';touch.hidden=true;help.hidden=true;progress.textContent='사진 3/3 완료 · 게임이 종료되었습니다.';
  if(!space.finalEndingStarted){space.finalEndingStarted=true;document.documentElement.classList.add('photo-game-completed');game.gameEnded=true;game.ghostEncounters?.stop();game.tensionDirector?.silence();game.playerControls?.controls.unlock();if(game.playTimer){clearInterval(game.playTimer.interval);game.playTimer.startedAt=null;game.playTimer.start=()=>{};game.playTimer.display.style.display='none';}if(space.archive?.quest){clearInterval(space.archive.quest.interval);space.archive.quest.interval=null;space.archive.quest.phase='completed';}game.interactionManager.closeInspect=()=>{};const footer=document.getElementById('inspect-close');if(footer)footer.hidden=true;window.addEventListener('keydown',event=>{if(!['Tab','Enter','Space'].includes(event.code))event.preventDefault();event.stopImmediatePropagation();},{capture:true});}
  const card=document.createElement('div');card.className='mp-final-photo';card.setAttribute('aria-label','마지막 사진이 뒤집히며 드러나는 다음 시즌 예고');
  const front=document.createElement('div');front.className='mp-final-front';const image=document.createElement('img');image.src=PHOTO_URLS[state.lastPhoto??2];image.alt='마지막으로 해결한 사진';front.appendChild(image);
  const back=document.createElement('div');back.className='mp-final-back';const title=document.createElement('strong');title.textContent='다음 시즌 예고 · 새벽의 윤전기';const teaser=document.createElement('blockquote');teaser.textContent='“분명 세 사람이 찍힌 사진이었다.\n뒷면에는 네 번째 이름이 적혀 있었다.\n그 이름은… 당신의 것이었다.\n\n새벽 네 시, 멈춘 윤전기가 다시 돌면\n아직 찍히지 않은 당신의 실종 기사가 인쇄된다.\n뒤에서 종이 넘기는 소리가 나도, 돌아보지 마라.”';back.append(title,teaser);card.append(front,back);panel.appendChild(card);
  const credit=document.createElement('p');credit.className='mp-photo-credit';credit.textContent=CREDIT;panel.appendChild(credit);
  const close=document.createElement('button');close.textContent='예고 확인 · 게임 종료';close.onclick=()=>{endGame(game);return;state.teaserSeen=true;view.replaceChildren();const terminal=document.createElement('section');terminal.className='gm-expansion mp-puzzle';const heading=document.createElement('h2');heading.textContent='게임이 종료되었습니다.';const message=document.createElement('p');message.textContent='모든 퍼즐을 해결했습니다. 다음 시즌에서 다시 만나겠습니다. 게임을 다시 시작하려면 페이지를 새로고침하세요.';terminal.append(heading,message);view.appendChild(terminal);};panel.appendChild(close);view.scrollTop=0;
  requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.add('mp-flipped')));
  setTimeout(()=>endGame(game),14000);   /* 예고를 다 읽을 시간 뒤엔 저절로 끝남 */
  return;
 }
 if(index===undefined){const p=document.createElement('p');p.textContent='입구를 지나 왼쪽 벽의 초록 테두리 사진부터 조사하세요. 초록 집게에 ①·②·③ 번호가 적혀 있습니다.';panel.appendChild(p);const start=document.createElement('button');start.textContent='안내 확인 · 초록 집게 사진 찾기';start.onclick=()=>game.interactionManager.closeInspect();panel.appendChild(start);return;}
 const caption=document.createElement('p');caption.textContent=`사진 ${index+1} · 신문사 보관 사진`;panel.appendChild(caption);const credit=document.createElement('p');credit.className='mp-photo-credit';credit.textContent=CREDIT;panel.appendChild(credit);
 if(state.found.has(index)){caption.textContent+=' · 확인 완료 ✓';return;}
 const pair=document.createElement('div');pair.className='mp-comparison';panel.appendChild(pair);const difference=DIFFERENCES[index];let target;
 for(const dry of [false,true]){
  const figure=document.createElement('figure'),label=document.createElement('figcaption');label.textContent=dry?'건조 사진 · 달라진 곳을 누르세요':'원본 사진';figure.appendChild(label);const photo=document.createElement('div');photo.className='mp-compare-photo';const image=document.createElement('img');image.src=PHOTO_URLS[index];image.alt=dry?'비교용 건조 사진':'변경 전 원본 사진';photo.appendChild(image);figure.appendChild(photo);pair.appendChild(figure);
  if(dry){photo.onclick=()=>{if(!game.gameEnded)progress.textContent='이곳은 원본과 같아요. 추가된 작은 표시를 찾아보세요. 초록 힌트를 볼 수도 있어요.';};target=document.createElement('button');target.className='mp-difference';target.style.left=difference.x+'%';target.style.top=difference.y+'%';target.textContent=difference.mark;target.setAttribute('aria-label','달라진 흔적 선택');target.onclick=e=>{e.stopPropagation();if(game.gameEnded||!state.choose(index,'difference'))return;if(state.solved){game.sharedInventory.addItem({id:'drying_press_key',name:'윤전기실 열쇠',desc:'세 사진의 달라진 흔적을 확인하고 얻은 열쇠.'});game.soundManager.playFloorboardCreak();}render(space,index);};photo.appendChild(target);}
 }
 const hint=document.createElement('button');hint.textContent='초록 힌트 보기';hint.onclick=()=>{progress.textContent=difference.hint;target.classList.add('mp-answer');};panel.appendChild(hint);

}
return{Puzzle,render,PHOTO_URLS,CREDIT,DIFFERENCES,canEnd,endGame};
});
