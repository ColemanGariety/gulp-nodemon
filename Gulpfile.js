var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , mocha = require('gulp-mocha')

gulp.task('test', function () {
  gulp.src('./test/*-test.js')
    .pipe(jshint({ asi: true, laxcomma: true }))
    .pipe(mocha({ ui: 'bdd' }))
})
