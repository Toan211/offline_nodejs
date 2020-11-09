const http = require('http'); 
const fs = require('fs');

const configs = require('./myModule/config'); 


http.createServer((req, res) => {  
	fs.readFile('./home.html', (err, data) => {
		//!cách 1

		if (err) throw err;			//nếu error, thì quăng error ra
		//console.log(data);			//nếu ko error, thì in data ra

		res.write(data);				//respond: trả về kết quả (data của thg html)
		res.end();
	  });				  
}).listen(configs.port);


/**  //!cách để node đọc file html
	Khai báo fs (file system)
	sau đó đọc file
 
	nếu Terminal in ra dc cái buffer, chứng tỏ nó in ra dc cái data ra rôi
	thay cái data thành res

	chuột trái, nhấn viewSource, nếu nó vẫn quay--> lỗi gì đó
	khi đã write (trả về kết quả) thì phải cho nó end
 */
