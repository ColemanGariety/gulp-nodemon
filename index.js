var es = require('event-stream')
  , nodemon = require('nodemon')
  , cli = require('nodemon/lib/cli')
  , path = require('path')

module.exports = function (settings) {
  settings = settings || ''

  return es.map(function (file, callback) {
    var options = ['nodemon', path.resolve(file.path)].concat(settings.split(' '))

    try {
      // Our script
      options = cli.parse(options)
      options.restartable = 'rs'
      nodemon({ script: file.path, args: [], restartable: 'fs' })
      // Forward ^C back to gulp
      process.on('SIGINT', function () { process.exit() })
    } catch (e) { throw e }

    callback(null, file)
  })
}