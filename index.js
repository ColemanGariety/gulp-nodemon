var nodemon = require('nodemon')
  , colors = require('colors')
  , gulp = require('gulp')

module.exports = function (settings) {
  settings = settings || {}
  settings.script = settings.script || ''
  settings.options = settings.options || ''

  options = ['nodemon', settings.script, settings.options].join(' ');

  try {
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
