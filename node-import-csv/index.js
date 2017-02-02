var Analytics = require('analytics-node');
var fs = require('fs');
var parse = require('csv-parse');
var analytics = new Analytics('YOUR WRITE KEY');

// var csvData = 0;
var rowCount = 0;
fs.createReadStream('test.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
      // ignore header values when invoking identify method
        if (rowCount > 0) {
          sendIdentifies(csvrow);
        }
        rowCount++;
    });
    // .on('end',function() {
    //   //do something with csvData
    //   console.log('csv data:', csvData);
    //   iterateOverData(csvData);
    // });

function sendIdentifies(data){
  console.log('data for identify event:', data)
  analytics.identify({
    userId: data[1],
    traits: {
    company: data[3],
    email: data[4],
    favorite_band: data[5]
  }
});
}
