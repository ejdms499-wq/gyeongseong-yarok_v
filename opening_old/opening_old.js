/* 경성야록 — 예전 오프닝 보관본 (전구·쪽지·11시 59분 시계·지면 조각·2026─1924·벽시계·號外 도장·방울 건너뛰기)
   app.js에서 떼어 보관한 코드입니다. 지금 사이트에서는 쓰지 않습니다. 되살리려면 이 코드를 app.js의 같은 자리에 되돌리세요. */

/* =========================================================
   시작 화면: 전구 빛 · 11시 59분 벽시계 (1단계에서 만든 것 그대로)
   ========================================================= */
const gate=$('#gate'),gNote=$('#gNote');
$('.gc-ticks').innerHTML=Array.from({length:12},(_,i)=>`<line x1="60" y1="${i%3?20:19}" x2="60" y2="${i%3?23:25}" stroke="#2a2214" stroke-width="${i%3?.7:1.4}" transform="rotate(${i*30} 60 60)"/>`).join('');
function gateLight(){if(gate.style.display==='none')return;const r=gNote.getBoundingClientRect();
  gate.style.setProperty('--ny',(r.top+r.height/2)+'px');gate.style.setProperty('--nt',r.top+'px');
  gate.style.setProperty('--rx',Math.round(r.width*.8)+'px');gate.style.setProperty('--ry',Math.round(r.height*.85)+'px')}
gateLight();addEventListener('resize',gateLight);document.fonts?.ready.then(gateLight);
const startBtn=$('#start');
['pointerenter','focus'].forEach(ev=>startBtn.addEventListener(ev,()=>gate.classList.add('bright')));
['pointerleave','blur'].forEach(ev=>startBtn.addEventListener(ev,()=>gate.classList.remove('bright')));
let entering=false,seenOpening=false;
async function enter(withSound){
  if(entering)return;entering=true;
  muted=!withSound;if(!muted){initAudio();if(ac&&ac.state==='suspended')ac.resume();soundOff=false}
  gate.classList.remove('bright');gate.classList.add('noon');tick(.5);      // 분침이 12시로 '딱'
  await wait(450);
  gate.classList.add('off');tick(.16);                                      // 전구가 꺼짐
  await wait(reduce?800:300);                                                // 암흑 0.3초 (기다리는 느낌 없이)
  gate.style.display='none';startOpening();
}
startBtn.addEventListener('click',()=>enter(true));
$('#startMute').addEventListener('click',()=>enter(false));
function showGate(){
  stopOpening();hideAllViews();$('#top').hidden=true;muteBtn.hidden=true;modernBtn.hidden=true;lampMode('off');
  gate.classList.remove('noon','off','bright');gate.style.display='';entering=false;gateLight();
  if(ac)musicTo(0,1);document.title='경성야록 : 자정의 호외';
}

/* =========================================================
   오프닝 — 약 11초 자동 재생 (검은 빈 화면으로 기다리는 구간 없음)
   ========================================================= */
const OP=DATA.opening,opEl=$('#opening'),skipWrap=$('#skipWrap'),skipBell=$('#skipBell');
let opOn=false,opSkipping=false,opTimers=[],opRAF=0,opT0=0,opPieces=[],opPhase='cloud',opHandFrom=0;
const opLater=(s,fn)=>{opTimers.push(setTimeout(()=>{if(opOn)fn()},s*1000))};
function dialSVG(){
  const R=['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'];let s='';
  s+=`<svg viewBox="0 0 400 400" aria-hidden="true"><defs>
    <radialGradient id="odFace" cx=".44" cy=".4" r=".72"><stop offset="0" stop-color="#e3d4a6"/><stop offset=".6" stop-color="#c4ad78"/><stop offset="1" stop-color="#6f5830"/></radialGradient>
    <radialGradient id="odGlass" cx=".3" cy=".25" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".4" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></radialGradient>
    <filter id="odRust" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="4" seed="8" result="n"/><feColorMatrix in="n" values="0 0 0 0 .5 0 0 0 0 .24 0 0 0 0 .07 0 0 0 1.5 -.55" result="r"/><feComposite in="r" in2="SourceGraphic" operator="in" result="rr"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="rr"/></feMerge></filter>
    <filter id="odAge"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" values="0 0 0 0 .3 0 0 0 0 .2 0 0 0 0 .08 0 0 0 -1.6 1.05"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    <clipPath id="odClip"><circle cx="200" cy="200" r="182"/></clipPath></defs>
    <circle cx="200" cy="200" r="197" fill="#2b1f10" stroke="#5e4220" stroke-width="7" filter="url(#odRust)"/>
    <circle cx="200" cy="200" r="186" fill="none" stroke="#8a6a36" stroke-width="3" filter="url(#odRust)"/>
    <circle cx="200" cy="200" r="182" fill="url(#odFace)"/>
    <g clip-path="url(#odClip)"><rect width="400" height="400" fill="#000" filter="url(#odAge)" opacity=".55"/>
      <ellipse cx="120" cy="250" rx="60" ry="34" fill="#6b4a1c" opacity=".28"/><ellipse cx="270" cy="120" rx="34" ry="22" fill="#6b4a1c" opacity=".22"/><ellipse cx="250" cy="300" rx="22" ry="40" fill="#5a3c14" opacity=".18"/></g>`;
  for(let i=0;i<60;i++)s+=`<line x1="200" y1="${i%5?24:22}" x2="200" y2="${i%5?31:38}" stroke="#2a2214" stroke-opacity="${(.55+Math.random()*.4).toFixed(2)}" stroke-width="${i%5?1:2.6}" transform="rotate(${i*6} 200 200)"/>`;
  R.forEach((n,i)=>{const a=i*30*Math.PI/180,x=200+Math.sin(a)*132,y=200-Math.cos(a)*132;s+=`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="25" font-family="serif" fill="#231c10" fill-opacity="${[.85,.5,.8,.7,.45,.8,.75,.6,.8,.55,.8,.7][i]}" transform="rotate(${i*30} ${x.toFixed(1)} ${y.toFixed(1)})">${n}</text>`});
  s+=`<g class="op-hand op-hh"><path d="M195 210 L200 108 L205 210 Z" fill="#17120a"/></g><g class="op-hand op-mm"><path d="M197.5 218 L200 46 L202.5 218 Z" fill="#17120a"/></g>
    <circle cx="200" cy="200" r="8" fill="#17120a"/><circle cx="200" cy="200" r="2.6" fill="#8d2a1c"/>
    <circle cx="200" cy="200" r="182" fill="url(#odGlass)"/>
    <g stroke="#fbf3dc" fill="none" stroke-linecap="round" opacity=".6"><path d="M128 104 L162 150 L150 196 L190 238 L182 300" stroke-width="1.2"/><path d="M162 150 L214 136 L262 84" stroke-width="1"/><path d="M150 196 L96 216 L60 206" stroke-width=".9"/><path d="M190 238 L246 256 L300 300" stroke-width=".8"/><path d="M128 104 L110 70" stroke-width=".7"/><path d="M142 124 q20 -6 34 4" stroke-width=".6"/></g></svg>`;
  return s;
}
function opBuild(){
  const L=OP.line;
  opEl.innerHTML=`<div class="op-layer op-cloud"></div>`
    +`<div class="op-line"><div class="op-track"><b class="op-y y0">${L.from}</b><i class="op-path"></i><b class="op-y y1">${L.to}</b></div><p class="op-cap">${[...L.caption].map(c=>c===' '?' ':`<i>${esc(c)}</i>`).join('')}</p></div>`
    +`<div class="op-dial">${dialSVG()}<div class="op-year"></div></div><p id="opStamp" aria-hidden="true">號外</p><div class="op-light"></div>`;
  const box=opEl.querySelector('.op-cloud'),base=clamp(innerWidth/1150,.62,1.35);   // 조각 12개, 크고 선명하게
  opPieces=OP.cloud.map(c=>{const z=Math.random(),k=(.85+z*.75)*base,el=document.createElement('span');el.className='op-p';
    Object.assign(el.style,{width:c.w*k+'px',height:c.h*k+'px',backgroundImage:`url('assets/scans/${c.src}.jpg')`,backgroundSize:`${500*k}px auto`,backgroundPosition:`${-c.x*k}px ${-c.y*k}px`,
      filter:`grayscale(1) contrast(1.2) brightness(1.06) blur(${((1-z)*1.1).toFixed(1)}px)`,zIndex:Math.round(z*100)});box.appendChild(el);
    return {el,z,w:c.w*k,h:c.h*k,bx:.08+Math.random()*.84,by:.1+Math.random()*.8,ph:Math.random()*6.28,ax:.05+Math.random()*.07,ay:.04+Math.random()*.06,r0:(Math.random()-.5)*10,op:.72+z*.28}});
}
function opLoop(now){
  if(!opOn)return;opRAF=requestAnimationFrame(opLoop);
  const t=(now-opT0)/1000,W=innerWidth,H=innerHeight,cx=W/2,cy=H*.46;
  const light=opEl.querySelector('.op-light');let lxp=cx,lyp=cy;
  // 0~3초: 떠다니다 가운데로 빨려 들어감
  if(opPhase==='cloud'){const s=clamp((t-1.9)/1.1,0,1),e=s*s;
    opPieces.forEach(p=>{const mv=reduce?0:1;
      const x=p.bx*W*1.1-W*.05+Math.sin(t*p.ax*6+p.ph)*W*.035*mv,y=p.by*H*1.1-H*.05+Math.cos(t*p.ay*6+p.ph)*H*.035*mv;
      const X=x+(cx-x)*e,Y=y+(cy-y)*e,sc=1-e*.94,rot=p.r0+Math.sin(t*.3+p.ph)*2*mv+e*p.r0*3;
      p.el.style.transform=`translate(${X-p.w/2}px,${Y-p.h/2}px) rotate(${rot}deg) scale(${sc})`;p.el.style.opacity=p.op*(1-s)});
    lxp=cx+Math.sin(t*.9)*W*.22*(1-s);lyp=cy+Math.cos(t*.7)*H*.16*(1-s)}
  // 5~8초: 바늘이 거꾸로 빠르게
  if(opPhase==='dial'&&!reduce){const u=Math.max(0,t-5);const mm=354-u*720,hh=359.5-u*60;
    opEl.querySelector('.op-mm').style.transform=`rotate(${mm}deg)`;opEl.querySelector('.op-hh').style.transform=`rotate(${hh}deg)`;lyp=cy+H*.05}
  light.style.transform=`translate(${lxp-W/2}px,${lyp-H/2}px)`;
}
function startOpening(){
  opBuild();opOn=true;opSkipping=false;opPhase='cloud';opTimers.forEach(clearTimeout);opTimers=[];
  opEl.hidden=false;opEl.style.opacity='';
  muteBtn.hidden=false;syncMute();
  // 음악: 3초에 걸쳐 천천히 (최대 25%)
  if(ac){drone(true);musicTo(MUSIC.peak,3)}
  // 건너뛰기 방울: 위에서 끈과 함께 내려옴
  skipBell.classList.remove('ring');skipBell.querySelector('.sk-tag').classList.remove('drop');
  skipWrap.hidden=false;skipWrap.classList.remove('down','up');void skipWrap.offsetWidth;skipWrap.classList.add('down');
  const hint=skipWrap.querySelector('.sk-hint');hint.classList.remove('show');
  if(!seenOpening){opLater(2.5,()=>hint.classList.add('show'));opLater(7.5,()=>hint.classList.remove('show'))}
  opT0=performance.now();cancelAnimationFrame(opRAF);opRAF=requestAnimationFrame(opLoop);
  const line=opEl.querySelector('.op-line'),y0=line.querySelector('.y0'),y1=line.querySelector('.y1'),path=line.querySelector('.op-path'),caps=[...line.querySelectorAll('.op-cap i')],track=line.querySelector('.op-track');
  const dial=opEl.querySelector('.op-dial'),yEl=dial.querySelector('.op-year'),light=opEl.querySelector('.op-light'),stamp=opEl.querySelector('#opStamp');
  // 3~5초: 2026 ──── 1924
  opLater(3,()=>{opPhase='line';opEl.querySelector('.op-cloud').style.display='none';line.classList.add('on');y0.classList.add('on');press(.12)});
  opLater(3.15,()=>path.classList.add('on'));
  caps.forEach((c,i)=>opLater(3.25+i*(1.2/caps.length),()=>c.classList.add('on')));
  opLater(3.85,()=>{y1.classList.add('on');press(.12)});
  opLater(4.35,()=>{y0.classList.add('fade');track.style.transform=`translateX(${-(.84-.5)*innerWidth}px)`});
  opLater(4.9,()=>{line.classList.remove('on')});
  // 5~8초: 낡은 벽시계, 바늘은 거꾸로, 연도만 빠르게
  opLater(5,()=>{opPhase='dial';dial.classList.add('on')});
  OP.years.forEach((y,i)=>opLater(5.3+i*.42,()=>{yEl.textContent=y;yEl.classList.remove('flip');void yEl.offsetWidth;yEl.classList.add('flip');tick(.12)}));
  // 8~9.5초: 방울 소리 → 전구 꺼짐 0.3초 → 號外 도장
  opLater(7.9,()=>{dial.classList.remove('on');jingle(.4);if(ac)musicTo(MUSIC.low,.8)});
  opLater(8.4,()=>jingle(.85));
  opLater(8.8,()=>{light.classList.add('off');if(ac)musicTo(0,.05);opPhase='dark'});
  opLater(9.1,()=>{light.classList.remove('off');light.style.transform='translate(0,0)';stamp.classList.add('hit');thud()});
  // 9.5~11초: 종이가 안쪽에서부터 검게 젖어듦 → 메인
  opLater(9.45,()=>finishOpening(false));
}
async function finishOpening(short){
  if(!opOn)return;
  const stamp=opEl.querySelector('#opStamp').getBoundingClientRect();
  seenOpening=true;
  await Blood.run({short,origin:{x:stamp.left+stamp.width/2,y:stamp.top+stamp.height/2,r:Math.max(stamp.width,stamp.height)},
    onCovered:()=>{stopOpening();history.replaceState(null,'','#main');render({v:'front'});if(ac)musicTo(MUSIC.main,2.5)}});
}
function stopOpening(){opOn=false;opTimers.forEach(clearTimeout);opTimers=[];cancelAnimationFrame(opRAF);opEl.hidden=true;
  if(!skipWrap.hidden){skipWrap.classList.remove('down');skipWrap.classList.add('up');setTimeout(()=>{if(!opOn)skipWrap.hidden=true},950)}}
/* 건너뛰기: 방울 '딸랑' → 꼬리표가 떨어지며 화면 흔들림 → 시계 바늘이 자정으로 → 號外 도장 → 짧은 검은 피 */
async function skipOpening(){
  if(!opOn||opSkipping)return;opSkipping=true;opTimers.forEach(clearTimeout);opTimers=[];
  const hint=skipWrap.querySelector('.sk-hint');hint.classList.remove('show');
  if(reduce){opOn=true;await Blood.fade(()=>{stopOpening();history.replaceState(null,'','#main');render({v:'front'});if(ac)musicTo(MUSIC.main,2)});return}
  skipBell.classList.add('ring');jingle(1.3);
  await wait(350);skipBell.querySelector('.sk-tag').classList.add('drop');opEl.classList.remove('op-shake');void opEl.offsetWidth;opEl.classList.add('op-shake');
  await wait(420);
  opPhase='skip';opEl.querySelector('.op-cloud').style.display='none';opEl.querySelector('.op-line').classList.remove('on');
  const light=opEl.querySelector('.op-light');light.classList.remove('off');light.style.transform='translate(0,0)';
  const dial=opEl.querySelector('.op-dial');dial.classList.add('on');dial.querySelector('.op-year').textContent='';
  const mm=dial.querySelector('.op-mm'),hh=dial.querySelector('.op-hh'),t0=performance.now();
  await Promise.race([new Promise(res=>{const st=now=>{const k=ease((now-t0)/650);mm.style.transform=`rotate(${-900+(900+720)*k}deg)`;hh.style.transform=`rotate(${-75+(75+360)*k}deg)`;
    if(k<1)requestAnimationFrame(st);else res()};requestAnimationFrame(st)}),wait(900)]);
  tick(.2);await wait(250);dial.classList.remove('on');
  const stamp=opEl.querySelector('#opStamp');stamp.classList.add('hit');thud();
  await wait(350);finishOpening(true);
}
skipBell.addEventListener('click',skipOpening);
document.addEventListener('keydown',e=>{if(opOn&&(e.key==='Escape'||e.key===' '||e.code==='Space')){e.preventDefault();skipOpening()}});

