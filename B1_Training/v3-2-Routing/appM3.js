
const http = require('http'); 

const configs = require('./myModule/config'); 
const helpers = require('./myModule/function');

http.createServer(helpers.onRequest).listen(configs.port);



/** chỉ cần gọi đến onRequest, ko cần gọi đến fs vs url nữa 
*/