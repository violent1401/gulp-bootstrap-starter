var gulp         = require('gulp');
var postcss   	 = require('gulp-postcss');
var cssnext      = require('postcss-cssnext');
var plumber      = require('gulp-plumber');
var precss       = require('precss');
var gutil        = require('gulp-util');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;


// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync({
    proxy: "gulp"
  });
});

// ////////////////////////////////////////////////
// Пути к исходным файлам
// ///////////////////////////////////////////////
var paths = {
  html:['*.php'],
  css:['./src/*.css'],
  script:['./assets/js/*.js']
};

postcss([
  cssnext({
    features: {
      pixrem: false
    }
  })
])


gulp.task('css', function(){
    var processors = [
        cssnext({replace: false, browsers: ['last 7 version']}),
        precss
    ];
    return gulp.src(paths.css)
        .pipe(plumber({
          errorHandler: function (err) {
            console.log(err);
            this.emit('end');
          }
        }))
        .pipe(postcss(processors))
		    .pipe(gulp.dest('./'))
		    .pipe(reload({stream:true}));
});

gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

gulp.task('scripts', function(){
  return gulp.src(paths.script)
    .pipe(reload({stream:true}));
});


gulp.task('watcher',function(){
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.script, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watcher', 'browserSync']);
