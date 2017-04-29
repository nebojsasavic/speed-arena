var gulp       = require('gulp')
var eslint     = require('gulp-eslint')
var babel      = require('gulp-babel')
var browserify = require('browserify')
var babelify   = require('babelify')
var uglify     = require('gulp-uglify')
var source     = require('vinyl-source-stream')
var buffer     = require('vinyl-buffer')

gulp.task('eslint', function() {
  return gulp.src(['scripts/*.es6', '!node_modules/**'])
    .pipe(eslint({
      ecmaFeatures: {
          'modules'    : true,
          'spread'     : true,
          'restParams' : true
      },
      parserOptions: {
          'sourceType': 'module',
      },
      rules: {
          'semi' : ['error', 'never']
      },
      envs: [
          // 'browser',
          'es6'
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('es6', function() {
  browserify('scripts/main.js')
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    // .pipe(uglify()) // TURN ON WHEN PRODUCTION READY.
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['eslint', 'es6'], () => {
	gulp.watch('scripts/**/*.js', ['eslint', 'es6'])
})
