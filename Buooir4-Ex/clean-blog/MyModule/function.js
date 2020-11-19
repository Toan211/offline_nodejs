

const fs = require('fs');
const url = require('url');     //lấy url
const http = require('http'); 
var path = require('path');

const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg'
};


function showHTML(path, res)
{
  fs.readFile(path, (err, data) => {     
    if (err) {
      console.log("ERROR");
      return;
  }
  res.setHeader('Content-Type', 'text/html');
  res.write(data);
  res.end();
  })
}

function render404(res)
{
    res.writeHead(404);				//khi lỗi, đẩy vào trang lỗi (404)
    res.write('file not found'); 
    res.end();
}



function onRequest(req, res)
{
  let path = url.parse(req.url).pathname;  // lấy path của cái url của mh

  console.log(path);

  switch (path) {
    case '/':
        showHTML('./view/index.html',res);
        break;
    case '/about':
        showHTML('./view/about.html',res);
        break;
    case '/contact':
        showHTML('./view/contact.html',res);
        break;
    case '/post':
        showHTML('./view/post.html',res);
        break;
    default:  
        render404(res);
        break;
  }	

  var myUri = url.parse(req.url).pathname;
  console.log(myUri);
  var filename = path.join(process.cwd(), unescape(myUri));
  console.log('File you are looking for is:' + filename);
  var loadFile;

  try {
      loadFile = fs.lstatSync(filename);
  } catch (error) {
      console.log('ERROR:' + error);
      res.writeHead(404, {
          "Content-Type": 'text/plain'
      });
      res.write('404 Internal Error');
      res.end();
      return; 
  }
  if (loadFile.isFile()) {
    var mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]];
    res.writeHead(200, {
        "Content-Type": mimeType
    });
    var fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);
  } else if (loadFile.isDirectory()) {
    res.writeHead(302, {
        'Location': 'index.html'
    });
    res.end();
  } else {
    res.writeHead(500, {
        "Content-Type": 'text/plain'
    });
    res.write('500 Internal Error');
    res.end();
  }

}

//muốn sử dụng onRequest bên appM3, phải export từ bên này

module.exports = {
    onRequest: onRequest
};

//phải import cả thằng fs vs url vào luôn