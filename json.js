const Analytics = require('analytics-node')
const jsonfile = require('jsonfile')

const analytics = new Analytics('YOUR WRITE KEY')

/**
 * WARNING: readFile method opens the entire json file at once
 * Use a data stream if the file is large to prevent the program from crashing
 */

const file = './src/test.json'
let i = 0

try {
  jsonfile.readFile(file, {}, (err, data) => {
    while (i < data.length) {
      analytics.identify({
        userId: data[i]['userId'],
        company: data[i]['company'],
        email: data[i]['email'],
        favorite_band: data[i]['favorite_band']
      })
      i++
    }
  })
} catch (e) {
  console.log(e)
}
