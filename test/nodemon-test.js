var should = require('should')
  , nodemon = require('../index')
  , gulp = require('gulp')
  , map = require('map-stream')
  , fs = require('fs')
  , path = require('path')
  , net = require('net')
  , running = require('is-running')

describe('nodemon', function () {
  var stream
    , script
    , tmp = path.join(__dirname, 'tmp.js')
  
  before(function () {
    fs.createWriteStream(tmp).end('module.exports = \'wat\'')
  })
  
  it('should run a script', function () {
    stream = gulp.src(tmp).pipe(nodemon())
  })
})