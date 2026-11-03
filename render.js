// 60fps, 3 subframes per frame -> ffmpeg tmix -> mux audio
const { chromium } = require('playwright'); const path=require('path'); const { spawn }=require('child_process');
(async()=>{
  const out=process.argv[2], wav=process.argv[3]; const FPS=60, SUB=3, DUR=15, N=FPS*DUR;
  const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-c:v','mjpeg','-framerate',String(FPS*SUB),'-i','-','-i',wav,
    '-filter_complex',`[0:v]tmix=frames=${SUB}:weights='1 1 1',select='eq(mod(n\\,${SUB})\\,${SUB-1})',setpts=N/${FPS}/TB,fps=${FPS},format=yuv420p[v]`,
    '-map','[v]','-map','1:a','-c:v','libx264','-preset','slow','-crf','16','-c:a','aac','-b:a','256k','-shortest','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  p.on('pageerror',e=>console.log('ERR',e.message));
  await p.goto('file://'+path.resolve(__dirname,'../film.html')); await p.evaluate(()=>window.ready);
  const t0=Date.now();
  for(let f=0;f<N;f++){ for(let k=0;k<SUB;k++){ const t=Math.max(0,(f+(k-(SUB-1))/SUB*0.5)/FPS);
      await p.evaluate(t=>window.seek(t),t); const buf=await p.screenshot({type:'jpeg',quality:95});
      if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); }
    if(f%60===0) console.log(`frame ${f}/${N}  ${((Date.now()-t0)/1000).toFixed(0)}s`); }
  ff.stdin.end(); await b.close(); await new Promise(r=>ff.on('close',r)); console.log('done',out);
})();
