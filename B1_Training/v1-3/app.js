const http = require('http'); 

const moduleConfig = require('./myModule/config'); 


http.createServer((req, res) => {  
	res.statusCode = 200;								/**tạo server, sau khi lắng nghe thì trả về nội dung (hay mang nd đó lên html đó) */
	res.setHeader('Content-Type', 'text/html'); 	//? text/plain chỉ là text bt, phải cho text/html, nó mới xài dc h1
	res.end('<h1>Hello nodeJS V3</h1><h1>Hello nodeJS V3</h1><h1>Hello nodeJS V3</h1> ');        
										 	//nếu cho '<h1> hello <h1>' 
												//trong khi đang xài header text/plain thì nó chỉ in ra: '<h1> hello <h1>'
													// chứ ko phải thẻ html h1
													
}).listen(moduleConfig.port);



