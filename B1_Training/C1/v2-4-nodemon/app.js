const http = require('http'); 

const moduleConfig = require('./myModule/config'); 


http.createServer((req, res) => {  
	res.statusCode = 200;								
	res.setHeader('Content-Type', 'text/html'); 	//? text/plain chỉ là text bt, phải cho text/html, nó mới xài dc h1
	res.end('<h1>Hello nodeJS V3</h1><h1>Hello nodeJS V3</h1><h1>Hello nodeJS V3</h1> ');        
										 	
}).listen(moduleConfig.port);


/**  //!cách để nodejs tự động update khi thay đổi gì đó
 lên nodemon, install về ở terminal //*npm install -g nodemon
 dể kt nó đã cài đặt hay chưa, 		//*nodemon [your node app]
 rồi xong chỉ cần lưu lại, nó sẽ tự động chạy
 */
