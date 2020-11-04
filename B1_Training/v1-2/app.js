const http = require('http'); // nodejs require many module, wanna more module? paste their name in this field
                    //module dc node js xây dựng sẵn

const moduleOne = require('./libs'); 

const server = http.createServer((req, res) => {  //require // respond (kết quả trả về)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello lmao');           //trả về g trị hello world
});

server.listen(moduleOne.port, moduleOne.hostname, () => {       //server lắng nghe port là 3000, hostname 
  console.log(`Server running at http://${moduleOne.hostname}:${moduleOne.port}/`);   //in ra giá trị server đang lắng nghe

  moduleOne.show()  //gọi đến các function trong file libs.js
});