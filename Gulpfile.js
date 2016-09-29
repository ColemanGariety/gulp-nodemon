var gulp    = require('gulp')
  , jshint  = require('gulp-jshint')
  , nodemon = require('./index')
//  , path = require('path')

// gulp.task('test', function () {
//   gulp.src('./test/*-test.js')
//     .pipe(jshint({ asi: true, laxcomma: true }))
//     .pipe(mocha({ ui: 'bdd' }))
// })

gulp.task('lint', function (){
  gulp.src('./*/**.js')
    .pipe(jshint())
})

gulp.task('cssmin', function (){ /* void */
})

gulp.task('afterstart', function (){
  console.log('proc has finished restarting!')
})

gulp.task('test', ['lint'], function () {
  var stream = nodemon({
      nodemon: require('nodemon')
    , script: './test/server.js'
    , verbose: true
    , env: {
        'NODE_ENV': 'development'
      }
    , watch: './'
    , ext: 'js coffee'
  })

  stream
    .on('restart', 'cssmin')
    .on('crash', function (){
      console.error('\nApplication has crashed!')
      console.error('Restarting in 3 seconds')
      stream.nodemon.emit('restart', 3000)
    })
})
