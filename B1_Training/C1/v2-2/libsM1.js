function showNotify()
{
    console.log("Hello Modules Method 1");
}
const hostname = '127.0.0.1'; 
const port = 5500;                    // có thể truy cập ở localhost:5500

//! Cách 1
//*export: xuất ra ShowNotify bằng biến show
module.exports.show = showNotify;       //* xây dựng 1 function, và xuất nó ra vs tên gọi là show
                                        //* muốn sd dc, thì kéo vào như cách làm của http
module.exports.hostname = hostname; 
module.exports.port = port;             //* muốn sử dụng bên app thì phải export ở bên đây   

/** 
 * ?dấu phẩy là cấu trúc của object
 {
    a,v,b
 }
 */
