(()=>{
  const canvas=document.querySelector('#lantern-canvas'),handle=document.querySelector('#pull-handle');
  if(!canvas||!handle)return;
  const ctx=canvas.getContext('2d'),toggleButton=document.querySelector('#lantern-toggle'),hint=document.querySelector('.hint');let savedLight=0,savedHidden=0,savedSwing=null;try{savedLight=sessionStorage.getItem('nocturne-lantern-lit')==='1'?1:0;savedHidden=sessionStorage.getItem('nocturne-lantern-hidden')==='1'?1:0;const parsedSwing=JSON.parse(sessionStorage.getItem('nocturne-lantern-swing')||'null');if(parsedSwing&&Number.isFinite(parsedSwing.angle)&&Number.isFinite(parsedSwing.velocity))savedSwing=parsedSwing}catch{}document.documentElement.style.setProperty('--lit',String(savedLight));document.documentElement.style.setProperty('--glow',String(savedLight));let w=0,h=0,dpr=1,last=0,angle=savedSwing?savedSwing.angle:-.34,velocity=savedSwing?savedSwing.velocity:0,lit=savedLight,target=savedLight,pull=0,stretch=0,pulse=0,visibility=savedHidden,visibilityTarget=savedHidden,drag=false,startY=0,swingDrag=false,swingStartX=0,swingStartAngle=0,lastSwingAt=0,swingLength=1;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',resize);resize();
  addEventListener('pagehide',()=>{try{sessionStorage.setItem('nocturne-lantern-swing',JSON.stringify({angle,velocity}))}catch{}});
  const swingTarget=document.createElement('button');swingTarget.type='button';swingTarget.id='lantern-drag-handle';swingTarget.setAttribute('aria-label','Drag lantern to swing');swingTarget.setAttribute('aria-hidden','true');swingTarget.tabIndex=-1;document.body.appendChild(swingTarget);
  swingTarget.addEventListener('pointerdown',e=>{if(e.button!==0||visibility>.985)return;swingDrag=true;swingStartX=e.clientX;swingStartAngle=angle;lastSwingAt=performance.now();velocity=0;swingTarget.setPointerCapture(e.pointerId);e.preventDefault()});
  swingTarget.addEventListener('pointermove',e=>{if(!swingDrag)return;const now=performance.now(),dt=Math.max((now-lastSwingAt)/1000,1/240),limit=Math.sin(.82),horizontal=clamp(Math.sin(swingStartAngle)+(e.clientX-swingStartX)/Math.max(swingLength,1),-limit,limit),nextAngle=Math.asin(horizontal);velocity=clamp((nextAngle-angle)/dt,-.68,.68);angle=nextAngle;lastSwingAt=now});
  swingTarget.addEventListener('pointerup',()=>{swingDrag=false});
  swingTarget.addEventListener('pointercancel',()=>{swingDrag=false;velocity=0});
  const metal=(x,y,width)=>{const g=ctx.createLinearGradient(x-width/2,y,x+width/2,y);g.addColorStop(0,'#382819');g.addColorStop(.22,'#9c6c32');g.addColorStop(.46,'#f0ca7d');g.addColorStop(.63,'#986b35');g.addColorStop(.84,'#cf9f53');g.addColorStop(1,'#47301c');return g};
  function toggle(){target=target>.5?0:1;try{sessionStorage.setItem('nocturne-lantern-lit',target>.5?'1':'0')}catch{}pulse=1}
  function toggleLantern(){visibilityTarget=visibilityTarget<.5?1:0;try{sessionStorage.setItem('nocturne-lantern-hidden',visibilityTarget>.5?'1':'0')}catch{}updateToggle()}
  function updateToggle(){if(toggleButton){const hidden=visibilityTarget>.5;toggleButton.textContent=hidden?'Show lantern':'Hide lantern';toggleButton.setAttribute('aria-pressed',String(hidden));}}
  toggleButton?.addEventListener('click',toggleLantern);
  updateToggle();
  function drawLamp(x,y,s){ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.scale(s,s);
    // suspension crown and brass rim
    ctx.strokeStyle=metal(0,-124,36);ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,-121,13,Math.PI,Math.PI*2);ctx.stroke();
    ctx.fillStyle=metal(0,-105,110);ctx.beginPath();ctx.moveTo(-41,-119);ctx.quadraticCurveTo(-34,-137,0,-138);ctx.quadraticCurveTo(34,-137,41,-119);ctx.lineTo(32,-102);ctx.lineTo(-32,-102);ctx.closePath();ctx.fill();
    // warm glass chamber
    const flame=ctx.createRadialGradient(-4,-54,2,0,-54,61);flame.addColorStop(0,`rgba(255,244,190,${.94*lit})`);flame.addColorStop(.34,`rgba(255,172,65,${.67*lit})`);flame.addColorStop(1,`rgba(238,115,34,${.13*lit})`);
    ctx.fillStyle='#20170f';ctx.beginPath();ctx.moveTo(-31,-99);ctx.lineTo(-43,-37);ctx.lineTo(-34,-5);ctx.lineTo(34,-5);ctx.lineTo(43,-37);ctx.lineTo(31,-99);ctx.closePath();ctx.fill();
    ctx.fillStyle=flame;ctx.beginPath();ctx.moveTo(-27,-96);ctx.lineTo(-36,-39);ctx.lineTo(-29,-10);ctx.lineTo(29,-10);ctx.lineTo(36,-39);ctx.lineTo(27,-96);ctx.closePath();ctx.fill();
    const glass=ctx.createLinearGradient(-38,0,39,0);glass.addColorStop(0,'rgba(187,217,219,.22)');glass.addColorStop(.28,'rgba(242,250,222,.05)');glass.addColorStop(.5,'rgba(255,238,191,.08)');glass.addColorStop(.78,'rgba(194,224,217,.15)');glass.addColorStop(1,'rgba(255,255,255,.31)');ctx.fillStyle=glass;ctx.beginPath();ctx.moveTo(-30,-97);ctx.lineTo(-39,-39);ctx.lineTo(-31,-9);ctx.lineTo(31,-9);ctx.lineTo(39,-39);ctx.lineTo(30,-97);ctx.closePath();ctx.fill();
    if(lit>.02){ctx.save();ctx.globalAlpha=lit;ctx.fillStyle='#fff4c5';ctx.shadowColor='#ffaf3c';ctx.shadowBlur=25;ctx.beginPath();ctx.moveTo(0,-26);ctx.bezierCurveTo(-15,-42,1,-60,3,-72);ctx.bezierCurveTo(25,-52,17,-39,0,-26);ctx.fill();ctx.restore()}
    ctx.lineCap='round';ctx.strokeStyle=metal(0,-50,88);ctx.lineWidth=5;for(const side of [-1,1]){ctx.beginPath();ctx.moveTo(side*32,-101);ctx.quadraticCurveTo(side*38,-48,side*31,-7);ctx.stroke()}
    ctx.fillStyle=metal(0,-3,88);ctx.beginPath();ctx.moveTo(-35,-12);ctx.lineTo(-43,-2);ctx.quadraticCurveTo(-43,4,-33,5);ctx.lineTo(33,5);ctx.quadraticCurveTo(43,4,43,-2);ctx.lineTo(35,-12);ctx.closePath();ctx.fill();
    ctx.fillStyle='#382719';ctx.beginPath();ctx.ellipse(0,-7,23,3,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=metal(0,-112,70);ctx.beginPath();ctx.ellipse(0,-104,35,7,0,0,Math.PI*2);ctx.fill();
    const cordEnd=82+stretch*74;ctx.strokeStyle='#b08a54';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(0,5);ctx.quadraticCurveTo(2,23,0,cordEnd-7);ctx.stroke();ctx.fillStyle=metal(0,cordEnd,12);ctx.beginPath();ctx.ellipse(0,cordEnd,4.5,7,0,0,Math.PI*2);ctx.fill();
    const beadX=x-Math.sin(angle)*cordEnd*s,beadY=y+Math.cos(angle)*cordEnd*s;handle.style.left=`${beadX-26}px`;handle.style.top=`${beadY-30}px`;ctx.restore();
  }
  handle.addEventListener('pointerdown',e=>{drag=true;startY=e.clientY;pull=0;handle.setPointerCapture(e.pointerId);e.preventDefault()});
  handle.addEventListener('pointermove',e=>{if(drag)pull=clamp((e.clientY-startY)/90,0,1.25)});
  handle.addEventListener('pointerup',e=>{if(!drag)return;const dy=e.clientY-startY;if(dy>14||Math.abs(dy)<10)toggle();drag=false;pull=0});
  handle.addEventListener('pointercancel',()=>{drag=false;pull=0});
  addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();toggle()}});
  let dust=Array.from({length:22},()=>({x:Math.random()-.5,y:Math.random()-.5,r:.6+Math.random()*1.2,p:Math.random()*7}));
  function frame(t){const dt=Math.min((t-last)/1000||0,.035);last=t;pulse=Math.max(0,pulse-dt*1.4);stretch+=(Math.max(pull,pulse)-stretch)*(1-Math.exp(-dt*18));visibility+=(visibilityTarget-visibility)*(1-Math.exp(-dt*2.2));if(!swingDrag){angle+=velocity*dt;velocity+=(-.67*Math.sin(angle)-.115*velocity)*dt;velocity=clamp(velocity,-.68,.68)}else{velocity*=Math.exp(-dt*4.5)}lit+=(target-lit)*(1-Math.exp(-dt*4));
    document.documentElement.style.setProperty('--lit',lit.toFixed(3));document.documentElement.style.setProperty('--glow',lit.toFixed(3));
    const s=clamp(Math.min(w/680,h/720),.48,.88),length=Math.max(clamp(h*.29,190,300),w*.30),drop=(h+420)*visibility*visibility,ax=w*.5,ay=Math.min(-12,h*.30-length)+drop,px=ax+Math.sin(angle)*length,py=ay+Math.cos(angle)*length,lx=px-Math.sin(angle)*138*s,ly=py+Math.cos(angle)*138*s;swingLength=length;swingTarget.style.left=(lx-54*s)+'px';swingTarget.style.top=(ly-140*s)+'px';swingTarget.style.width=(108*s)+'px';swingTarget.style.height=(150*s)+'px';swingTarget.style.pointerEvents=visibility>.985?'none':'auto';
    document.documentElement.style.setProperty('--lamp-x',`${(lx/w*100).toFixed(2)}%`);document.documentElement.style.setProperty('--lamp-y',`${(ly/h*100).toFixed(2)}%`);
    ctx.clearRect(0,0,w,h);const visibleAlpha=1-clamp((visibility-.58)/.42,0,1);ctx.save();ctx.globalAlpha=visibleAlpha;ctx.strokeStyle='rgba(193,157,98,.82)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(px,py);ctx.stroke();
    for(let f=.03;f<.98;f+=Math.max(.025,9/length)){const x=ax+(px-ax)*f,y=ay+(py-ay)*f;ctx.fillStyle='#a77d47';ctx.beginPath();ctx.ellipse(x,y,2,3,angle,0,Math.PI*2);ctx.fill()}
    if(lit>.02){for(const d of dust){d.p+=dt*(.3+d.r*.12);const x=lx+d.x*220+Math.sin(d.p)*8,y=ly+d.y*230+Math.cos(d.p*.8)*9;ctx.fillStyle=`rgba(255,216,145,${lit*(.05+.13*(.5+.5*Math.sin(d.p)))})`;ctx.beginPath();ctx.arc(x,y,d.r,0,Math.PI*2);ctx.fill()}}
    drawLamp(lx,ly,s);ctx.restore();handle.disabled=visibility>.985;handle.style.pointerEvents=visibility>.985?'none':'auto';if(hint)hint.style.opacity=visibility>.5?'0':'.47';requestAnimationFrame(frame)
  }requestAnimationFrame(frame);
})();
