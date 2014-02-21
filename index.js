var nodemon = require('nodemon')
  , colors = require('colors')
  , gulp = require('gulp')

module.exports = function (options) {
  try {

    // Our script
    var script = nodemon(options)
      , originalDon = script.on

    process.on('exit', script.emit.bind(script, 'exit'))

    // Forward log messages
    script.on('log', function (log) {
      console.log('[gulp] ' + ('[nodemon] ' + log.message).yellow)
    })

    // Shim 'on' for use with gulp tasks
    script.on = function (event, tasks) {
      if (tasks instanceof Function) originalDon(event, tasks)
      else originalDon(event, function () {
        if (Array.isArray(tasks)) {
          tasks.forEach(function (task) {
            gulp.run(task)
          })
        } else gulp.run(tasks)
      })
    }

    return script

  } catch (e) { throw '[gulp] ' + ('[nodemon]' + String(e.message)).yellow }
}
