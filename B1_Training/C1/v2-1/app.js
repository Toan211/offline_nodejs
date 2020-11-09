const http = require('http'); // nodejs require many module, wanna more module? paste their name in this field

const hostname = '127.0.0.1'; 
const port = 5500;              //nếu thay đổi thứ gì đó trong đây (port, content,...), 
                                    //thì phải restart lại server (ngắt kết nối: ctrl-c)

const server = http.createServer((req, res) => {  //require // respond (kết quả trả về)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello lmao');           //trả về g trị hello world trên trang html
});

server.listen(port, hostname, () => {       //server lắng nghe port là 3000, hostname
  console.log(`Server running at http://${hostname}:${port}/`);   //in ra giá trị server đang lắng nghe ở bảng terminal
});

/**server sẽ run trên local host tại hostname và port */