var gulp         = require('gulp');
var postcss   	 = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext      = require('postcss-cssnext');
var precss       = require('precss');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var connectPHP   = require('gulp-connect-php');


// ////////////////////////////////////////////////
// Пути к исходным файлам
// они немного изменились
// ///////////////////////////////////////////////
var paths = {
  html:['./*.php'],
  css:['./src/*.css'],
  script:['./*.js']
};

gulp.task('css', function(){
  var processors = [
        cssnext({browsers: ['last 7 version']}),
        precss
    ];
    return gulp.src(paths.css)
        .pipe(postcss(processors))
		    .pipe(gulp.dest('/'))
		    .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// HTML
// ///////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

gulp.task('php', function(){
  connectPHP.server({ base: './', keepalive:true, hostname: 'localhost', port:8080, open: false});
});
// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8080,
    open: true,
    notify: false
  });
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

gulp.task('default', ['watcher', 'browserSync', 'php']);