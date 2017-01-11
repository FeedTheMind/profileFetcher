var fs = require('fs');

function mergeValues(values, content) {
  // Cycle over keys
  for (var key in values) {
    content = content.replace('{{' + key + '}}', values[key]);
    // Replace all {{key}} with value from values object
  }

  // return merged content
  return content;
}

function view(templateName, values, response) {
  // Read from the template file
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'}); 
  // Insert values, content
  fileContents = mergeValues(values, fileContents);
  // Write out content(s) to response
  response.write(fileContents);
}

module.exports.view = view;
