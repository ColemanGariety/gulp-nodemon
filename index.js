var nodemon = require('nodemon')
  , cli = require('nodemon/lib/cli')
  , colors = require('colors')
  , gulp = require('gulp')

module.exports = function (settings) {
  settings = settings || {}
  settings.script = settings.script || ''
  settings.options = settings.options || ''

  options = ['nodemon', settings.script].concat(settings.options.split(' '))

  try {

    // Parse settings
    options = cli.parse(options)
    options.script = settings.script

    // Our script
    var script = nodemon(options)

    // Forward log messages
    script.on('log', function (log) {
      console.log(('[nodemon] ' + log.message).yellow)
    })

    return {
      on: function (event, tasks) {
        script.on(event, function () {
          gulp.run(tasks)
        })
      }
    , emit: function (event) {
        script.emit(event)
      }
    }

  } catch (e) { throw e }
}
