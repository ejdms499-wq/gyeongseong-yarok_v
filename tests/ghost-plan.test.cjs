const test = require('node:test');
const assert = require('node:assert/strict');
const { createPlan, GHOSTS, PLACES } = require('../sikjasil/assets/ghost-director.js');
function seeded(seed) {
  return () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
}
test('each new play has six different ghosts and six random places inside ten minutes', () => {
  const places = new Set(), signatures = new Set();
  for (let seed = 1; seed <= 1000; seed++) {
    const plan = createPlan(seeded(seed));
    assert.equal(plan.length, 6);
    assert.equal(new Set(plan.map(e => e.ghost.id)).size, 6);assert.equal(new Set(plan.map(e=>e.action)).size,6);assert.equal(plan.find(e=>e.place.id==='ceiling').action,'drop');assert.equal(plan.find(e=>e.place.id==='floor').action,'rise');
    assert.equal(new Set(plan.map(e => e.place.id)).size, 6);
    for (let i = 0; i < plan.length; i++) {
      assert.ok(plan[i].at >= 20 && plan[i].at < 540);
      if (i) assert.ok(plan[i].at - plan[i - 1].at >= 20);
      places.add(plan[i].place.id);
    }
    signatures.add(JSON.stringify(plan.map(e => [e.at, e.ghost.id, e.place.id])));
  }
  assert.equal(signatures.size, 1000);
  assert.equal(places.size, 8);
  assert.equal(GHOSTS.length, 6);
  assert.equal(PLACES.length, 8);
});

test('expanded rooms resolve ceiling/floor/wall/corner inside the current room',()=>{
 const {resolveExpandedPlace,fadeOpacity}=require('../sikjasil/assets/ghost-director.js');
 const fallback=PLACES[0];assert.equal(resolveExpandedPlace({x:0,y:1.65,z:4},{x:1,z:0},()=>0,fallback),fallback);
 for(const [x,zone,minX,maxX,minZ,maxZ]of[[9,'stairs',5.4,14,-3.9,-1.5],[22,'archive',14,28,-6.2,.8],[32,'darkroom',28,35,-5.7,.3],[38,'photos',35,42,-5.7,.3]]){
  for(const [i,kind]of['ceiling','floor','wall','corner'].entries()){
   const place=resolveExpandedPlace({x,y:-1.95,z:-2.7},{x:1,z:-.1},()=>i/4+.01,fallback);assert.equal(place.id,kind);assert.equal(place.zone,zone);assert.ok(place.point[0]>minX&&place.point[0]<maxX);assert.ok(place.point[2]>minZ&&place.point[2]<maxZ);
  }
 }
 assert.equal(fadeOpacity(0),0);assert.ok(fadeOpacity(.2)>0&&fadeOpacity(.2)<1);assert.equal(fadeOpacity(.6),1);assert.ok(fadeOpacity(2)>0&&fadeOpacity(2)<1);assert.equal(fadeOpacity(2.4),0);
});

test('director uses resolved new-room coordinates and fades the same encounter in/out',()=>{
 const {Director,resolveExpandedPlace}=require('../sikjasil/assets/ghost-director.js');
 class Vector{constructor(x=0,y=0,z=0){Object.assign(this,{x,y,z});}clone(){return new Vector(this.x,this.y,this.z);}add(v){this.x+=v.x;this.y+=v.y;this.z+=v.z;return this;}copy(v){Object.assign(this,v);return this;}lerpVectors(a,b,t){this.x=a.x+(b.x-a.x)*t;this.y=a.y+(b.y-a.y)*t;this.z=a.z+(b.z-a.z)*t;return this;}}
 const previousWindow=global.window,previousEvent=global.CustomEvent;
 try{
  global.window={dispatchEvent(){}};global.CustomEvent=class{constructor(type,options){Object.assign(this,{type,...options});}};
  const director=Object.create(Director.prototype);Object.assign(director,{ready:true,stopped:false,active:null,THREE:{Vector3:Vector},material:{},sprite:{position:new Vector(),scale:{set(){}},visible:false},textures:new Map([['crawler',{}]]),images:new Map([['crawler',{src:'crawler.png'}]]),layer:{dataset:{},classList:{add(){},remove(){}},offsetWidth:1},figure:{},lighting:{triggerFlicker(){}},soundManager:{playGhostScream(){}},history:[],resolvePlace:fallback=>resolveExpandedPlace({x:38,y:-1.95,z:-2.7},{x:1,z:0},()=>.26,fallback)});
  const encounter={ghost:GHOSTS[0],place:PLACES[0],seen:false,at:400};assert.equal(director.trigger(encounter,1000),true);assert.equal(director.layer.dataset.zone,'photos');assert.equal(director.layer.dataset.location,'floor');assert.equal(director.history[0].zone,'photos');assert.equal(director.active.target.x,40.2);assert.equal(director.material.opacity,0);
  director.update(1200,true,400);assert.ok(director.material.opacity>0&&director.material.opacity<1);director.update(1600,true,400);assert.equal(director.material.opacity,1);director.update(3000,true,402);assert.ok(director.material.opacity>0&&director.material.opacity<1);director.update(3400,true,403);assert.equal(director.sprite.visible,false);assert.equal(director.active,null);assert.equal(director.trigger(encounter,5000),false);assert.equal(director.history.length,1);
 }finally{global.window=previousWindow;global.CustomEvent=previousEvent;}
});
