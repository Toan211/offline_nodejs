
const http = require('http'); 
const fs = require('fs');

const configs = require('./myModule/config'); 

//!cách 3 
function onRequest(req, res)
{
	fs.readFile('./home.html', (err, data) => {
        
    if (err){					//hoặc có thể viết thế này
        res.writeHead(404);				//khi lỗi, đẩy vào trang lỗi (404)
        res.write('file not found');
      }else {	//nếu ko có lỗi thì thực hiện
        res.write(data);				//respond: trả về kết quả (data của thg html)
        res.end();
      }
  });
}


http.createServer(onRequest).listen(configs.port);



/**
 * Tạo function
 */