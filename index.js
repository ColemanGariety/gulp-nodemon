var nodemon = require('nodemon')
  , colors = require('colors')
  , gulp = require('gulp')

module.exports = function (options) {
  if (options.exec instanceof Array) options.exec = options.exec.join(' ')
  if (typeof options.exec === 'string') options.exec = 'gulp ' + options.exec

  // Our script
  var script = nodemon(options)
    , originalOn = script.on  // http://www.youtube.com/watch?v=dKKdJoXF7PI&feature=kp

  script.on('log', function (log) {
    if (log.message.indexOf('change') > -1) nodemon.emit('change');
  })

  process.on('exit', script.emit.bind(script, 'exit'))

  // Forward log messages
  script.on('log', function (log) {
    console.log('[gulp] ' + ('[nodemon] ' + log.message).yellow)
  })

  // Shim 'on' for use with gulp tasks
  script.on = function (event, tasks) {
    var tasks = Array.prototype.slice.call(arguments)
      , event = tasks.shift()

    for (var i = 0; i < tasks.length; i++) {
      void function (tasks) {
        if (tasks instanceof Function) originalOn(event, tasks)
        else {
          originalOn(event, function () {
            if (Array.isArray(tasks)) {
              tasks.forEach(function (task) {
                run(task)
              })
            } else run(tasks)
          })
        }
      }(tasks[i])
    }
    return script
  }

  return script

  function run(tasks) {
    tasks = tasks.length ? [tasks] : ['default']
    gulp.start.apply(gulp, tasks)
  }
}
