var gulp        = require('gulp'),
    sass        = require('gulp-sass');


gulp.task('css', function() {
  return gulp.src('assets/stylesheets/*.scss')
    .pipe(
      sass( {
        includePaths: ['src/assets/stylesheets'],
        errLogToConsole: true
      } ) )
    .pipe( gulp.dest('dist/public/stylesheets/') );
});
