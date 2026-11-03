const { chromium } = require('playwright'); const path=require('path'); const fs=require('fs');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); await p.goto('file://'+path.resolve(__dirname,'audio.html'));
  const r=await p.evaluate(()=>window.renderAudio()); await b.close();
  const L=Buffer.from(r.l,'base64'), R=Buffer.from(r.r,'base64'); const n=L.length/2;
  const data=Buffer.alloc(n*4); for(let i=0;i<n;i++){ data.writeInt16LE(L.readInt16LE(i*2),i*4); data.writeInt16LE(R.readInt16LE(i*2),i*4+2); }
  const h=Buffer.alloc(44); h.write('RIFF',0); h.writeUInt32LE(36+data.length,4); h.write('WAVE',8); h.write('fmt ',12); h.writeUInt32LE(16,16); h.writeUInt16LE(1,20); h.writeUInt16LE(2,22); h.writeUInt32LE(r.sr,24); h.writeUInt32LE(r.sr*4,28); h.writeUInt16LE(4,32); h.writeUInt16LE(16,34); h.write('data',36); h.writeUInt32LE(data.length,40);
  fs.writeFileSync(process.argv[2],Buffer.concat([h,data])); console.log('wrote',process.argv[2]); })();
