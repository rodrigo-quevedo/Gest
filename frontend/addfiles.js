const fs=require('fs');
const path=require('path'); 
const root=process.cwd(); 
const used=new Set(); 
const glob=require('glob'); 
const files=['src/**/*.js','src/**/*.jsx']; 
files.forEach(pattern=>glob.sync(
  pattern,{cwd:root})
    .forEach(file=>{
      const text=fs.readFileSync(path.join(root,file),'utf8'); const re=/t\(\s*['"](workspace\.[^'"]+)['"]/g; 
      let m; 
      while((m=re.exec(text))){
        used.add(m[1]);
      }
    })
  ); 
  ['es','en'].forEach(lang=>{const file=path.join(root,'src','i18n',lang+'.json'); const keys=Object.keys(JSON.parse(fs.readFileSync(file,'utf8'))); const missing=Array.from(used).filter(k=>!keys.includes(k)).sort(); console.log('---',lang,'missing',missing.length); missing.forEach(k=>console.log(k));});