const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const spawn = require('child_process').spawn;
let node;

gulp.task('css', () => {
  gulp.src('assets/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: [
          'src/assets/stylesheets',
          'node_modules/govuk_frontend_toolkit/stylesheets',
          'node_modules/govuk-elements-sass/public/sass',
        ],
      }))
    .pipe(gulp.dest('dist/public/stylesheets/'));
});


gulp.task('server', () => {
  if (node) node.kill();
  node = spawn('node', ['bin/www'], { stdio: 'inherit' });
  node.on('close', (code) => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('watch', ['css', 'server'], () => {
  gulp.watch(['routes/**/*.js', 'app.js'], ['server']);
  gulp.watch('assets/stylesheets/*.scss', ['css']);
});


// clean up if an error goes unhandled.
process.on('exit', () => {
  if (node) node.kill();
});

