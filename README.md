gulp-nodemon
===========

A gulp task that will re-load your node script when it changes. Perfect for development.

## Usage

### **`nodemon([options])`**

You can pass an object to gulp-nodemon with options [specified in nodemon config](('https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md')).

Example below will start `server.js` in `development` mode and watch for changes, as well as watch all `.html` and `.js` files in the directory.
```javascript
{
  script: 'server.js'
, ext: 'js html'
, env: { 'NODE_ENV': 'development' }
}
```

gulp-nodemon returns a stream just like any other NodeJS stream, **except for the `on` method**, which conveniently takes gulp task names to execute.

#### **`.on([event], [tasks])`**

1. `[event]` is an event name as a string. (see: [nodemon events](https://github.com/remy/nodemon/blob/master/doc/events.md))
2. `[tasks]` A gulp task name, array of gulp task names, or a function to execute.

## Example

The following example will run your code with nodemon and lint it when your make changes.

```javascript
// Gulpfile.js
var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('develop', function () {
  nodemon({ script: 'server.js', ext: 'html js', ignore: ['ignored.js'] })
    .on('restart', ['lint'])
})
```
