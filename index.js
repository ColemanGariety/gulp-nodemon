var map = require('map-stream')
  , nodemon = require('nodemon')

module.exports = function (settings) {
  return map(function (file, callback) {
    try {
      // Our script
      nodemon({
        script: file.path
      , args: []
      , restartable: 'rs'
      })

      // Forward ^C to gulp
      process.on('SIGINT', function () { process.exit() })
    } catch (e) { throw e }

    callback(null, file)
  })
}