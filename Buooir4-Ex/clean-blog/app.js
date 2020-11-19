const http = require('http');
const url = require('url');
const fs = require('fs');
var path = require('path');

const config = require('./MyModule/config');

const mimetypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'map': 'text/plain',
    'ttf': 'text/plain',

};

onRenderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log("ERROR");
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        res.end();
    })
    // res.setHeader('Content-Type', 'text/html');
    // res.write(fs.readFileSync(path));
}

onListener = (req, res) => {
    let pathname = url.parse(req.url).pathname;

    switch (pathname) {
        case "/": {
            onRenderHTML('./index.html', res);
            break;
        }
        case "/about": {
            onRenderHTML('./about.html', res);
            break;
        }
        case "/contact": {
            onRenderHTML('./contact.html', res);
            break;
        }
    }

    var myuri = url.parse(req.url).pathname;
    console.log(myuri);
    var filename = path.join(process.cwd(), unescape(myuri));
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
            var mimeType = mimetypes[path.extname(filename).split('.').reverse()[0]];
           
            console.log(mimetypes[path.extname(filename).split('.').reverse()[0]]);
           
            res.writeHead(200, {
                "Content-Type": mimeType
            });
            var filestream = fs.createReadStream(filename);
            filestream.pipe(res);
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
http.createServer(onListener).listen(config.port);