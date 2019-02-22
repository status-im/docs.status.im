const fs  = require('fs')
const yml = require('js-yaml')
const qrc = require('qrcode')
const log = require('fancy-log')
 
const err_handler = (err) => {
  if (err) { throw err }
}
  
const gen_qr = () => {
  const qr_path = 'public/nightly/img/'
  const nightlies_path = 'source/_data/nightlies.yml'
  
  var nightlies_file = fs.readFileSync(nightlies_path, 'utf8')
  var nightlies = yml.safeLoad(nightlies_file)
  
  //log(qr_path + 'qr-apk.png (' + nightlies['APK'] + ')')
  qrc.toFile(qr_path + 'qr-apk.png', nightlies['APK'], {}, err_handler)
  //log(qr_path + 'qr-ios.png (' + nightlies['DIAWI'] + ')')
  qrc.toFile(qr_path + 'qr-ios.png', nightlies['DIAWI'], {}, err_handler)
}

module.exports = gen_qr
