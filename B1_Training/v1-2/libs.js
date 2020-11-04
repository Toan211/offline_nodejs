function showNotify()
{
    console.log("Hello Modules");
}
const hostname = '127.0.0.1'; 
const port = 5500;             


module.exports.show = showNotify; // xây dựng 1 function, và xuất nó ra vs tên gọi là show
//export: xuất ra ShowNotify        //muốn sd dc, thì kéo vào như cách làm của http
module.exports.hostname = hostname;
module.exports.port = port; //port trong tập lib