/*************
* Requires
**************/
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var rename = require('gulp-rename');


/*************
* Default Task
**************/
var defaultBuild = 'prod';


/*************
* Paths
**************/
var sassFiles = {
    src : [ './assets/sass/main.scss'],
    dist : './assets/css/',
    watch : [ './assets/sass/*.scss', './assets/sass/**/*.scss' ]
};
var jsFiles = {
    src : './assets/js/*.js',
    dist : './assets/js/min',
    watch : [ './assets/js/*.js' ]
};


/*************
* Functions
**************/
var sassOnError = function( err ) {

    notify.onError({
        title:    "SASS",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
       // sound:    "Beep"
    })( err );

    this.emit( 'end' );
};

var sassTask = function( compression ) {

    return gulp.src( sassFiles.src )
        .pipe( sourcemaps.init() )
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: compression
        }).on( 'error', sassOnError ) )
        .pipe( postcss( [autoprefixer({
            overrideBrowserslist: ['last 3 versions']
        })] ) )
		// .pipe(using({color:'red'}))
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( sassFiles.dist ) );
};

var jsTask = function( compressed ) {

    return gulp.src( jsFiles.src )
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .on('error', gutil.log)
        .pipe(concat('main.js'))
        .pipe( uglify({
            output: {
                beautify: compressed
            }
        }) )
        .pipe( rename({
            suffix: '.min'
        }) )
        .on('error', gutil.log)
        .pipe( gulp.dest( jsFiles.dist ) );
};


/*************
* SASS Tasks
**************/
gulp.task( 'sass:dev', function(done) {

    var sassCompression = 'compact';

    sassTask( sassCompression );
    done();
}); // gulp sass:dev

gulp.task( 'sass:prod', function(done) {

    var sassCompression = 'compressed';

    sassTask( sassCompression );
    done();
}); // gulp sass:prod


/*************
* JS Tasks
**************/
gulp.task( 'uglify:dev', function(done) {

    var jsBeautify = true;

    jsTask( jsBeautify );
    done();
}); // gulp uglify:dev

gulp.task( 'uglify:prod', function(done) {

    var jsBeautify = false;

    jsTask( jsBeautify );
    done();
}); // gulp uglify:prod



/*************
* Watch Tasks
**************/
gulp.task( 'default', function(done) {

    gulp.watch( sassFiles.watch, gulp.series('sass:' + defaultBuild)); // sass
    gulp.watch( jsFiles.watch, gulp.series('uglify:' + defaultBuild)); // js
    done();
}); // gulp

gulp.task( 'dev', gulp.series('sass:dev', 'uglify:dev')); // gulp dev
gulp.task( 'prod', gulp.series('sass:prod', 'uglify:prod')); // gulp prod
