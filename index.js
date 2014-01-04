var map = require('map-stream')
  , nodemon = require('nodemon')

module.exports = function (settings) {
  return map(function (file, callback) {
    try {
      // Our script
      var script = nodemon({
        script: file.path
      , args: []
      , restartable: 'rs'
      })
      
      // Forward ^C to gulp
      .on('exit', process.exit.bind(process))
    } catch (e) { throw e }
    
    callback(null, file)
  })
}