const fs  = require('fs')
const path = require('path')
const yml = require('js-yaml')
const qrc = require('qrcode')
const log = require('fancy-log')
 
const errHandler = (err) => {
  if (err) { throw err }
}
  
const genqr = (dataName, key, outputPath, fileName) => {
  const dataPath = `source/_data/${dataName}.yml`
  
  /* load the data file to extract the URL for QR code */
  var dataFile = fs.readFileSync(dataPath, 'utf8')
  var data = yml.safeLoad(dataFile)

  /* in case the output directory doesn't exist */
  if (!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath);
  }
  var qrFilePath = path.join(outputPath, fileName)
  var url = data[key]

  if (!url) {
    throw `No URL found for QR code under "${key}" key in "${dataPath}"!`
  }
  
  log.info(`Saving QR code: ${qrFilePath}`)
  /* generate the QR code image */
  qrc.toFile(qrFilePath, url, {}, errHandler)
}

module.exports = genqr
