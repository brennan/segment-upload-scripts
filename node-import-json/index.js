var Analytics = require('analytics-node');
var jsonfile = require('jsonfile');
var analytics = new Analytics('YOUR WRITE KEY');

var file = './test.json';

/*
WARNING: readFile method opens the entire json file at once
Use a data stream if the file is large to prevent the program from crashing
*/

jsonfile.readFile(file, {}, function(err, data) {
  console.log('data: ', data)
  console.log('first object: ', data[0])
  for (i = 0; i < data.length; i++) {
    analytics.identify({
      userId: data[i]['userId'],
      company: data[i]['company'],
      email: data[i]['email'],
      favorite_band: data[i]['favorite_band']
    });
  }
});
