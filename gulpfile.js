var gulp         = require('gulp');
var postcss   	 = require('gulp-postcss');
var cssnext      = require('postcss-cssnext');
var plumber      = require('gulp-plumber');
var precss       = require('precss');
var imagemin     = require('gulp-imagemin');
var criticalCss  = require('gulp-penthouse');
var inject       = require('gulp-inject-string');
var gutil        = require('gulp-util');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;

var siteUrl = 'foundation';
// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync({
    proxy: siteUrl
  });
});

// ////////////////////////////////////////////////
// Пути к исходным файлам
// ///////////////////////////////////////////////
var paths = {
  html:['*.php'],
  css:['./src/style.css'],
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

gulp.task('critical-css', function () {
  return gulp.src('./src/style.css')
  .pipe(criticalCss({
  out: process.argv[4], // output file name
  url: 'http://'+siteUrl+'/'+process.argv[4], // url from where we want penthouse to extract critical styles
  width: 1920, // max window width for critical media queries
  height: 1080, // max window height for critical media queries
  userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' // pretend to be googlebot when grabbing critical page styles.
  }))
  .pipe(gulp.dest('./src/')); // destination folder for the output file
});

gulp.task('img', function() { 
  gulp.src('./assets/img/*.{png,jpg,gif}') 
    .pipe(imagemin({ 
      optimizationLevel: 7, 
      progressive: true 
    })) 
    .pipe(gulp.dest('./assets/img')) 
});


gulp.task('watcher',function(){
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.script, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watcher', 'img', 'browserSync']);
