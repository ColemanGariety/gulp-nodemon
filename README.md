gulp-soften
===========

A gulp task that converts hard tabs to spaces.

## Usage

### **`soften([size])`**

`soften()` takes a single parameter, size, which is the number of spaces to convert tabs into.

It returns a stream for use in a streaming system like [gulp.js](http://gulpjs.com).

## Example

```javascript
// Gulpfile.js
var gulp = require('gulp')
  , soften = require('gulp-soften')

gulp.task('soften', function () {
  gulp.src('./**/*.js')
      .pipe(soften(2))
      .pipe(gulp.dest('./'))
})
```