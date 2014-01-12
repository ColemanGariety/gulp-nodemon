gulp-nodemon
===========

A gulp task that will re-load your node script when it changes. Perfect for development.

## Usage

### **`nodemon([settings])`**

You can pass an object to gulp nodemon with two optional settings:

```javascript
{
  options: '-e html,js -i ignored.js'
, script: './server.js'
}
```

Watch `.html` and `.js` files, but don't watch `foo.js`.

### **`nodemon().on([event], [tasks])`**

`[event]` is an event name as a string. (see: [nodemon events](https://github.com/remy/nodemon/blob/master/doc/events.md))
`[tasks]` A gulp task name as a string or an array of gulp task names. See example beow.


### **`nodemon().emit([event])`**

`[event]` (same as above)

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
  nodemon({ script: 'server.js', options: '-e html,js -i ignored.js' })
    .on('restart', ['lint'])
})
```
