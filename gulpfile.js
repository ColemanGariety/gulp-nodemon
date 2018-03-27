var gulp    = require('gulp')
  , gulpnodemon = require('./index')
  , jshint  = require('gulp-jshint')
  , nodemon = require('nodemon')

gulp.task('lint', function (){
  return gulp.src('./*/**.js')
    .pipe(jshint())
})

gulp.task('afterrestart', function (cb){
  console.log('proc has finished restarting!')
  cb();
})

gulp.task('test', gulp.series('lint', function (cb) {
  var stream = gulpnodemon({
      nodemon: nodemon
    , script: './test/server.js'
    , verbose: true
    , env: {
        'NODE_ENV': 'development'
      }
    , watch: './'
    , ext: 'js'
  })

  stream
    .on('restart', 'afterrestart')
    .on('crash', function (){
      console.error('\nApplication has crashed!\n')
      console.error('Restarting in 2 seconds...\n')
      setTimeout(function () {
        stream.emit('restart')
      }, 2000)
    })
  cb();
}))
