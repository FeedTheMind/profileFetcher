var Profile = require('./profile.js');
var renderer = require('./renderer.js');
var querystring = require('querystring');

var commonHeaders = {'Content-Type': 'text/html'};

// Handle HTTPS route GET / and POST/ i.e., "Home"
function home(request, response) {
  // if url == '/' && GET
  if (request.url === '/') {
    if (request.method.toLowerCase() === 'get') {
      // Show search
      response.writeHead(200, commonHeaders);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {
      // else url == '/' && POST

      // Get post data from body
      request.on('data', function (postBody) {
        // Extract username
        var query = querystring.parse(postBody.toString());
        // Redirect to /:username
        response.writeHead(303, {'location': '/' + query.username});
        response.end();
      });
    }
  }
}

// Handle HTTPS route GET /:username i.e., /username
function user(request, response) {
  // if url == '/ . . . '
  var username = request.url.replace('/', '');

  if (username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view('header', {}, response);

    // Get json from Treehouse
    var studentProfile = new Profile(username);
    // On "end"
    studentProfile.on('end', function (profileJSON) {
      // Show profile
      // Store values needed
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badgeCount: profileJSON.badges.length,
        javaScriptPoints: profileJSON.points.JavaScript
      };
      // Simple response
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });
    // On "error"
    studentProfile.on('error', function (error) {
      // Show error
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });      
  }
}

module.exports.home = home;
module.exports.user = user;
