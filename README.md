gulp-nodemon
===========

A gulp task that will re-load your node script when it changes. Perfect for development.

## Usage

### **`nodemon()`**

`nodemon()` returns a stream for use in a streaming system like [gulp.js](http://gulpjs.com).

## Example

The following example will lint your code then run it with nodemon and watch for changes.

```javascript
// Gulpfile.js
var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')

gulp.task('develop', function () {
  gulp.src('./server.js')
      .pipe(jshint())
      .pipe(nodemon())
})
```
