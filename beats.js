// usage: node tools/beats.js outdir [t1 t2 ...]
const { chromium } = require('playwright');
const path = require('path'); const fs=require('fs');
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out,{recursive:true});
  let times = process.argv.slice(3).map(Number);
  if (!times.length) times = Array.from({length:30},(_,b)=>b*0.5+0.3);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport:{width:1920,height:1080}, deviceScaleFactor:1 });
  page.on('console', m=>console.log('console:',m.text())); page.on('pageerror', e=>console.log('ERR',e.message));
  await page.goto('file://'+path.resolve(__dirname,'../film.html'));
  await page.evaluate(()=>window.ready);
  for (const t of times) { await page.evaluate(t=>window.seek(t), t); await page.screenshot({path:`${out}/t${t.toFixed(2).padStart(5,'0')}.jpg`, type:'jpeg', quality:80}); }
  await browser.close();
})();
