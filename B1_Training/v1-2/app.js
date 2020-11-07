const http = require('http'); // nodejs require many module, wanna more module? paste their name in this field
								// http is a module that nodejs has already built
//kéo những module dc xây dựng sẵn ở trên

//now u built your own module
//(likely c++ class, u make a class function in 1.c++, and go to main file, include 1.c++ )
const moduleOne = require('./libsM1'); 


http.createServer((req, res) => {  //ko cần tạo biến constant server nữa, 
	res.statusCode = 200;								/**tạo server, sau khi lắng nghe thì trả về nội dung (hay mang nd đó lên html đó) */
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello lmao');           
}).listen(
	moduleOne.port, moduleOne.hostname, () => {      //gọi đến moduleOne để lấy port hostname
	console.log(`Server running at http://${moduleOne.hostname}:${moduleOne.port}/`);   //in ra giá trị tại ngay console
	moduleOne.show() //gọi đến showNotify
});

/** xây dựng module cho riêng mình:
	export trong cái module đó ra, khi export ra rồi,
		ở bên tập tin cần sử dụng cần kéo module đó vào (const moduleOne = require('./libs');)
		muốn sử dụng phần tử nào, tên module đó . tên (moduleOne.port)
*/


