import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import stylus from 'gulp-stylus';
import htmlReplace from 'gulp-html-replace';
import imagemin from 'gulp-imagemin';
import runSequence from 'run-sequence';
import nib from 'nib';
import bootstrap from 'bootstrap-styl';
import changed from 'gulp-changed';

const paths = {
  bundle: 'app.js',
  srcJsx: 'src/Index.jsx',
  srcCss: 'src/**/*.styl',
  srcFonts: 'src/fonts/*',
  srcImg: 'src/images/**',
  dist: 'dist',
  distJs: 'dist/js',
  distFonts: 'dist/fonts',
  distImg: 'dist/images'
};

gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});


gulp.task('browserify', () => {
  browserify(paths.srcJsx)
    .transform(babelify)
    .bundle()
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJs));
});

gulp.task('fonts', () => {
  gulp.src(paths.srcFonts)
    .pipe(changed(paths.srcFonts))
    .pipe(gulp.dest(paths.distFonts));
});


gulp.task('styles', () => {
  gulp.src(paths.srcCss)
    .pipe(stylus({
      use: [nib(), bootstrap()],
      import: ['nib']
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('htmlReplace', () => {
  gulp.src('index.html')
    .pipe(htmlReplace({
      css: 'styles/main.css',
      js: 'js/app.js'
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
  gulp.src(paths.srcImg)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.distImg));
});

gulp.task('lint', () => {
  gulp.src(paths.srcJsx)
    .pipe(eslint())
    .pipe(eslint.format());
});


gulp.task('watchify', () => {
  let bundler = watchify(browserify(paths.srcJsx, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({
        stream: true
      }));
  }

  bundler.transform(babelify)
    .on('update', rebundle);
  return rebundle();
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcJsx, ['lint']);
});

gulp.task('watch', cb => {
  runSequence('clean', ['browserSync', 'watchTask', 'watchify', 'styles', 'lint', 'images', 'fonts'], cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'styles', 'htmlReplace', 'images', 'fonts'], cb);
});
