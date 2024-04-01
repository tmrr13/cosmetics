const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const connect = require('gulp-connect');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

function reload(done) {
  connect.server({
    livereload: true,
    port: 8080,
    root: 'docs',
  });
  done();
}

function styles() {
  return (
    gulp.src('src/sass/styles.scss')
      .pipe(plumber())
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('docs/assets/css'))
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('docs/assets/css'))
      .pipe(connect.reload())
  );
}

function scripts() {
  return (
    gulp.src('src/js/scripts.js')
      .pipe(plumber())
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(gulp.dest('docs/assets/js'))
      .pipe(uglify())
      .pipe(rename('scripts.min.js'))
      .pipe(gulp.dest('docs/assets/js'))
      .pipe(connect.reload())
  );
}

function html() {
  return (
    gulp.src('*.html')
      .pipe(plumber())
      .pipe(connect.reload())
  );
}

function views() {
  return (
    gulp.src('src/pug/pages/*.pug')
      .pipe(plumber())
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest('docs'))
      .pipe(connect.reload())
  );
}

function copyIcons() {
  return gulp.src('src/icons/*.svg')
    .pipe(gulp.dest('docs/assets/icons'))
    .pipe(connect.reload());
}

function copyImages() {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('docs/assets/images'))
    .pipe(connect.reload());
}

function copyFonts() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('docs/assets/fonts'))
    .pipe(connect.reload());
}

function copySlick() {
  return gulp.src('src/slick-slider/**/*')
    .pipe(gulp.dest('docs/assets/slick-slider'))
    .pipe(connect.reload());
}

function watchTask(done) {
  gulp.watch('*.html', html);
  gulp.watch('src/sass/**/*.scss', styles);
  gulp.watch('src/js/scripts.js', scripts);
  gulp.watch('src/pug/**/*.pug', views);
  gulp.watch('src/icons/*.svg', gulp.series(copyIcons, reload));
  gulp.watch('src/images/*', gulp.series(copyImages, reload));
  gulp.watch('src/fonts/**/*', gulp.series(copyFonts, reload));
  gulp.watch('src/slick-slider/**/*', gulp.series(copySlick, reload)); // Добавляем слежение за изменениями в папке slick-slider
  done();
}

const watch = gulp.parallel(watchTask, reload);
const build = gulp.series(gulp.parallel(styles, scripts, html, views, copyIcons, copyImages, copyFonts, copySlick));

exports.reload = reload;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.views = views;
exports.copyIcons = copyIcons;
exports.copyImages = copyImages;
exports.copyFonts = copyFonts;
exports.copySlick = copySlick; // Добавляем задачу копирования для slick-slider
exports.watch = watch;
exports.build = build;
exports.default = watch;
