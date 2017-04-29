var gulp   = require('gulp')
var eslint = require('gulp-eslint')
var open   = require('gulp-open')
var babel  = require('gulp-babel')

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

gulp.task('open', function() {
  gulp.src('./index.html')
    .pipe(open({app: 'chrome', uri: './index.html'}))
})

gulp.task('serve', ['eslint', 'babelify', 'open'], function() {
  console.log('Build task here...')
})