var gulp    = require('gulp')
  , jshint  = require('gulp-jshint')
  , nodemon = require('./index')
//  , path = require('path')

// gulp.task('test', function () {
//   gulp.src('./test/*-test.js')
//     .pipe(jshint({ asi: true, laxcomma: true }))
//     .pipe(mocha({ ui: 'bdd' }))
// })

function lint () {
  gulp.src('./*/**.js')
    .pipe(jshint())
}
gulp.task('lint', lint)

function cssmin (){ /* void */ }
gulp.task('cssmin', cssmin)

gulp.task('afterstart', function (){
  console.log('proc has finished restarting!')
})

gulp.task('test', gulp.parallel([lint]), function () {
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
    .on('restart', cssmin)
    .on('crash', function (){
      console.error('\nApplication has crashed!\n')
      console.error('Restarting in 2 seconds...\n')
      setTimeout(function () {
        stream.emit('restart')
      }, 2000)
    })
})
