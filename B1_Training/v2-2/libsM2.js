function showNotify()
{
    console.log("Hello Modules Method 2");
}
const hostname = '127.0.0.1'; 
const port = 5500;

 //!cách 2

//*muốn ngắn gọn hơn, thì sd:
module.exports={
    show: showNotify,
    hostname : hostname,
    port: port
}
