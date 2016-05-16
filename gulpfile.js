var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var spawn = require('child_process').spawn;
var node;


gulp.task('css', function () {
  gulp.src('assets/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: [
          'src/assets/stylesheets',
          'node_modules/govuk_frontend_toolkit/stylesheets',
          'node_modules/govuk-elements-sass/public/sass'
        ]
      }))
    .pipe(gulp.dest('dist/public/stylesheets/'));
});


gulp.task('server', function () {
  if (node) node.kill();
  node = spawn('node', ['bin/www'], { stdio: 'inherit' });
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('watch', ['css', 'server'], function () {
  gulp.watch(['routes/**/*.js', 'app.js'], ['server']);
  gulp.watch('assets/stylesheets/*.scss', ['css']);
});


// clean up if an error goes unhandled.
process.on('exit', function () {
  if (node) node.kill();
});

