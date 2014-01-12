gulp-nodemon
===========

A gulp task that will re-load your node script when it changes. Perfect for development.

## Usage

### **`nodemon([settings])`**

You can pass an object to gulp nodemon with two optional settings:

```javascript
{
  args: '-e html,js -i foo.js'
, crash: function (stream) {
    // 
  }
, exit:
, restart: 
}
```

Watch `.html` and `.js` files, but don't watch `foo.js`.

It returns a stream for use in a streaming system like [gulp.js](http://gulpjs.com).

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
      .pipe(nodemon('-e html,js -i foo.js'))
})
```
