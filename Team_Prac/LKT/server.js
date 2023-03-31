const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

class Server {
  constructor(port) {
    this.port = port;
  }
  start() {
    http.createServer((req, res) => {
      const parseUrl = url.parse(req.url, true);
      const pathName = parseUrl.pathname;
      const Method = req.method;

      if (Method === 'GET' && pathName === '/') {
        this.handleGetRequest(req, res);
      }
      else if (Method === 'POST' && pathName === '/post') {
        this.handlePostRequest(req, res);
      }
    })
      .listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });
  }


  handleGetRequest(req, res) {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.write('500 ');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  }

  handlePostRequest(req, res) {

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      let post = qs.parse(body);
      let name = post.name;
      let type = post.type;
      let taek = post.taek;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<!doctype html>
        <html>
        <head>
          <title>POST</title>
          <meta charset="utf-8">
        </head>
        <body>
        <form action="/post_test" method="post">
          <p>title : ${name}</p>
          <p>description : ${type}</p>
          <p>title : ${taek}</p>
          </form>
        </body>
        </html>`
      );

      function user(a, b, c){
        this.name = a;
        this.type = b;
        this.level = c;
      }
      let namename = [name];
      let typename = [type];
      let taekname = [taek];

      let array = [];
      for(let i = 0 ; i<namename.length; i++){
        array.push(new user(namename[i],typename[i],taekname[i]));
      }
      console.log(array);
      fs.writeFileSync("b.JSON",JSON.stringify(array, null, 2), "utf-8")
      res.end();
    })
  }
}
const server = new Server(2080);
server.start();
