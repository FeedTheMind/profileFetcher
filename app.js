// Problem: Need a simple way to look at user's badge count and JavaScript points
// Solution: Node.js to look up profiles and server our template via HTTPS

var router = require('./router.js');

// Create a web server
var https = require('https');
var http = require('http');

http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(3000);

console.log('Type localhost:3000 to access server.');
