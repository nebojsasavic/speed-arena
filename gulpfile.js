var gulp   = require('gulp')
var eslint = require('gulp-eslint')
var babel  = require('gulp-babel')
var cache  = require('gulp-cache')
var open   = require('gulp-open')

gulp.task('eslint', function() {
  return gulp.src(['scripts/*.es6', '!node_modules/**'])
    .pipe(eslint({
        rules: {
            'semi' : ["error", "never"]
        },
        envs: [
            // 'browser',
            'es6'
        ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('babelify', function() {
  gulp.src('scripts/*.es6')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist'))
})

gulp.task('clear-cache', function() {
  gulp.src('./dist/app.js')
    .pipe(cache.clear())
})

gulp.task('open', function() {
  gulp.src('./index.html')
    .pipe(open({app: 'chrome', uri: './index.html'}))
})

gulp.task('serve', ['eslint', 'babelify', 'clear-cache', 'open'], function() {
  console.log('Build task here...')
})