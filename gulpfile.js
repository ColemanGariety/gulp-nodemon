var gulp = require('gulp')
  , gulpnodemon = require('./index')
  , jshint  = require('gulp-jshint')
  , nodemon = require('nodemon');

gulp.task('lint', function (){
  return gulp.src('./*/**.js')
    .pipe(jshint())
});

gulp.task('afterrestart', function (done){
  console.log('proc has finished restarting!');
  done();
});

gulp.task('cssmin', function (done){
  done();
});

gulp.task('test', gulp.series('lint', function (done){
  var stream = gulpnodemon({
      nodemon: nodemon
    , script: './server.js'
    , verbose: true
    , env: {
        'NODE_ENV': 'development'
      }
    , watch: './'
    , ext: 'js coffee'
    , done: done
  });

  stream
    .on('restart', 'afterrestart')
    .on('crash', function (){
      console.error('\nApplication has crashed!\n');
      console.error('Restarting in 2 seconds...\n');
      setTimeout(function () {
        stream.emit('restart')
      }, 2000)
    })
}));
