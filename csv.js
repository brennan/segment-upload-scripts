const Analytics = require('analytics-node')
const fs = require('fs')
const parse = require('csv-parse')

const analytics = new Analytics('YOUR WRITE KEY')
let rowCount = 0

fs.createReadStream('./src/test.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', row => {
    if (rowCount > 0) sendIdentifies(row)
    rowCount++
  })

const sendIdentifies = data => {
  analytics.identify({
    userId: data[1],
    traits: {
      company: data[3],
      email: data[4],
      favorite_band: data[5]
    }
  })
}
