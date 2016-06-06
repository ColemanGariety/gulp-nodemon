'use strict'

var nodemon = require('nodemon')
  , colors = require('colors')
  , gulp = require('gulp')
  , cp = require('child_process')

module.exports = function (options) {
  options = options || {};
  if (typeof options.tasks === 'function') options.verbose = true // Enable verbose mode if file change list is needed

  // Our script
  var script = nodemon(options)
    , gulpCmd = options.gulpCmd || (process.platform === 'win32' ? 'gulp.cmd' : 'gulp')
    , originalOn = script.on

  // Allow for injection of tasks on file change
  if (options.tasks) {
    if (options.verbose) {
      script.on('log', function (log) {
        if (~log.message.indexOf('files triggering change check')) {
          if (typeof options.tasks === 'function') run(gulpCmd, options.tasks(log.message.split('files triggering change check: ').pop().split(' ')))
          else run(gulpCmd, options.tasks)
        }
      })
    } else {
      script.on('log', function (log) {
        if (~log.message.indexOf('restarting due to changes...')) {
          run(gulpCmd, options.tasks)
        }
      })
    }
  }

  // Capture ^C
  var exitHandler = function (options) {
    if (options.exit) script.emit('exit')
    if (options.quit) process.exit(0)
  }
  process.once('exit', exitHandler.bind(null, { exit: true }))
  process.once('SIGINT', exitHandler.bind(null, { quit: true }))

  // Forward log messages and stdin
  script.on('log', function (log) {
    console.log('[' + new Date().toString().split(' ')[4].gray + '] ' + ('[nodemon] ' + log.message).yellow)
  })
  
  // Shim 'on' for use with gulp tasks
  script.on = function (event, tasks) {
    var tasks = Array.prototype.slice.call(arguments)
      , event = tasks.shift()

    if (event === 'change') script.changeTasks = tasks
    else {
      for (var i = 0; i < tasks.length; i++) {
        void function (tasks) {
          if (tasks instanceof Function) originalOn(event, tasks)
          else {
            originalOn(event, function () {
              if (Array.isArray(tasks)) {
                tasks.forEach(function (task) {
                  run(gulpCmd, task)
                })
              } else run(gulpCmd, tasks)
            })
          }
        }(tasks[i])
      }
    }

    return script
  }

  return script

  // Synchronous alternative to gulp.run()
  function run(gulpCmd, tasks) {
    if (typeof tasks === 'string') tasks = [tasks]
    if (tasks.length === 0) return
    if (!(tasks instanceof Array)) throw new Error('Expected task name or array but found: ' + tasks)
    cp.spawnSync(gulpCmd, tasks, { stdio: [0, 1, 2] })
  }
}
