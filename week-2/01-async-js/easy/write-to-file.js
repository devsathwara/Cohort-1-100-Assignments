const fs=require('fs');
fs.writeFileSync('./test.txt',"Hello there Code runned");
console.log(fs.readFileSync('./test.txt').toString());