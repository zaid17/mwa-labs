const http = require("http");
const fs = require("fs");
const server = http.createServer(requestsHandler);

const fileRequestsHandler = function (filename, res) {
  res.setHeader("Content-Type", "text/html");
  let statusCode;
  let fileBuffer;
  fs.readFile(__dirname + `\\${filename}`, function (err, buffer) {
    if (err) {
      statusCode = 404;
      fileBuffer = "File not Found";
    } else {
      statusCode = 200;
      fileBuffer = buffer;
    }
    res.writeHead(statusCode);
    res.end(fileBuffer);
  });
};

const routes = {
  "/": "index.html",
  "/index.html": "index.html",
  "/page1.html": "page1.html",
  "/page2.html": "page2.html",
};

function requestsHandler(req, res) {
  const url = req.url.toLowerCase();
  const method = req.method.toLowerCase();
  console.log(url, method);
  if (method == "post") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{'message' : 'Hello World!'}`);
  } else if (routes[url]) {
    fileRequestsHandler(routes[url],res);
  } else {
    res.writeHead(404);
    res.end("resource not found");
  }
  //we can also do it this way:)
  // if (url == "/" && method == "get") {
  //   fileRequestsHandler("index.html", res);
  // } else if (url == "/index.html") {
  //   fileRequestsHandler("index.html", res);
  // } else if (url == "/page1.html") {
  //   fileRequestsHandler("page1.html", res);
  // } else if (url == "/page2.html") {
  //   fileRequestsHandler("page2.html", res);
  // } else if (method == "post") {
  //   res.setHeader("Content-Type", "application/json");
  //   res.writeHead(200);
  //   res.end(`{'message' : 'Hello World!'}`);
  // } else {
  //   res.end('resource not found');
  // }

  //create an array and put all the routes in it then search for the requested roure and return it
}

server.listen(3434, "localhost", function () {});
