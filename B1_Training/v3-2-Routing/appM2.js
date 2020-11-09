
const http = require('http'); 
const fs = require('fs');
const url = require('url');     //lấy url

const configs = require('./myModule/config'); 

function showHTML(path, res)
{
  fs.readFile(path, (err, data) => {
        
    if (err){					
        res.writeHead(404);				//khi lỗi, đẩy vào trang lỗi (404)
        res.write('file not found');
      }else {	          //nếu ko có lỗi thì thực hiện
        res.write(data);				//respond: trả về kết quả (data của thg html)
        res.end();
      }
  });
}

function render404(res)
{
    res.writeHead(404);				//khi lỗi, đẩy vào trang lỗi (404)
    res.write('file not found'); 
    res.end();
}

function onRequest(req, res)
{
  const path = url.parse(req.url).pathname;  // lấy path của cái url của mh
  console.log(path);

  switch (path) {
    case '/':
        showHTML('./View/home.html',res);
        break;
    case '/about':
        showHTML('./View/about.html',res);
        break;
    default:  
        render404(res);
        break;
  }	
}
http.createServer(onRequest).listen(configs.port);

