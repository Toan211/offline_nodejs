
const http = require('http'); 
const fs = require('fs');
const url = require('url');     //lấy url

const configs = require('./myModule/config'); 


function onRequest(req, res)
{
  //*console.log(req.url); // in url ra console//terminal

  //*console.log(url.parse(''));   //truyền vào đường dẫn //in ra nhiều thông in hơn, tt chính xác hơn

  const path = url.parse(req.url).pathname;  // lấy path của cái url của mh
  console.log(path);
 
  if(path == '/about')
  {
    fs.readFile('./View/about.html', (err, data) => {
        
      if (err){					//hoặc có thể viết thế này
          res.writeHead(404);				//khi lỗi, đẩy vào trang lỗi (404)
          res.write('file not found');
        }else {	//nếu ko có lỗi thì thực hiện
          res.write(data);				//respond: trả về kết quả (data của thg html)
          res.end();
        }
    });
  } else if (path == '/')
  {
    fs.readFile('./View/home.html', (err, data) => {
        
      if (err){					//hoặc có thể viết thế này
          res.writeHead(404);				//khi lỗi, đẩy vào trang lỗi (404)
          res.write('file not found');
        }else {	//nếu ko có lỗi thì thực hiện
          res.write(data);				//respond: trả về kết quả (data của thg html)
          res.end();
        }
    });
  }
  
	
}


http.createServer(onRequest).listen(configs.port);



/**
trang local host là trang chủ, nó vào port (nào đó) r gọi cái tên miền
  khi truy cập localhost:[port]/about, nó sẽ ra trang about cho chúng ta

  cần lam: khi gõ /   ,, nd trang home hiển thị, 
          gõ /about  ,, nd trang about hiển thị

 để lấy dc url, phải làm thêm cái module mới, rồi cho nó log lên terminal
 http://localhost:5500/       open home.html
 http://localhost:5500/about  open about.html
--> thuộc tính path or thuộc tính pathname:: /about
      nếu truy cập dc /about, thì có thể so sánh
        nếu ...

 
 */