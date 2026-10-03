(function(){
  var $=function(i){return document.getElementById(i)},
      liq=$('liq'),ml=$('ml'),tc=$('tc'),st=$('st'),sc=$('scrub'),pl=$('play'),
      steps=[].slice.call($('steps').children),sim=document.querySelector('.sim'),
      s1=$('s1'),s2=$('s2'),raf=null,playing=false;
  function lerp(a,b,t){return a+(b-a)*Math.min(1,Math.max(0,t))}
  function render(p){
    var v=0,t=25,step=0,status='Ready',boil=false,a1='standby',a2='standby';
    if(p<=0){step=-1}
    else if(p<12){step=0;status='Pod loaded';a2='checking'}
    else if(p<28){step=1;v=lerp(0,400,(p-12)/16);t=lerp(25,40,(p-12)/16);status='Filling';a2='water detected'}
    else if(p<55){step=2;v=400;t=lerp(40,88,(p-28)/12);status='Brewing';a1='watching';a2='water detected'}
    else if(p<82){step=3;v=lerp(400,100,(p-55)/27);t=lerp(88,90,(p-55)/27);status='Reducing';boil=true;a1='active';a2='water detected'}
    else if(p<93){step=4;v=100;t=lerp(90,70,(p-82)/11);status='Filtering'}
    else if(p<100){step=5;v=100;t=lerp(70,65,(p-93)/7);status='Dispensing'}
    else{step=6;v=100;t=65;status='Done'}
    ml.textContent=Math.round(v);tc.textContent=Math.round(t)+'°C';st.textContent=status;
    liq.style.height=(v/400*100)+'%';
    var c=p<28?0:Math.min(1,(p-28)/54);
    liq.style.background='rgb('+Math.round(lerp(222,120,c))+','+Math.round(lerp(204,58,c))+','+Math.round(lerp(140,14,c))+')';
    sim.classList.toggle('boil',boil);
    steps.forEach(function(li,i){li.className=i<step?'done':(i===step?'on':'')});
    s1.textContent='Anti-boil-over: '+a1;s2.textContent='Dry-run protection: '+a2;
  }
  function stop(){playing=false;pl.textContent=sc.value>=100?'Replay':'Play brew';cancelAnimationFrame(raf)}
  function tick(last){return function(now){
    if(!playing)return;
    var nv=parseFloat(sc.value)+(now-last)/150;
    if(nv>=100){sc.value=100;render(100);stop();return}
    sc.value=nv;render(nv);raf=requestAnimationFrame(tick(now));
  }}
  pl.addEventListener('click',function(){
    if(playing){stop();return}
    if(sc.value>=100)sc.value=0;
    playing=true;pl.textContent='Pause';
    raf=requestAnimationFrame(function(n){raf=requestAnimationFrame(tick(n))});
  });
  sc.addEventListener('input',function(){if(playing)stop();pl.textContent=sc.value>=100?'Replay':'Play brew';render(parseFloat(sc.value))});
  render(0);
})();
