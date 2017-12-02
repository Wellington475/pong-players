import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';

gulp.task('watch', () => {
  const config = Object.create(webpackConfig);
  config.watch = true;

  gulp.src('./src/app.js')
      .pipe(webpackStream(config))
      .pipe(gulp.dest('./public/js'));
});

gulp.task('build', () => {
  gulp.src('./src/app.js')
      .pipe(webpackStream(webpackConfig))
      .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['watch']);
