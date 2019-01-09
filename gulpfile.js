const gulp = require('gulp')
const log = require('fancy-log')
const source = require('vinyl-source-stream')
const babelify = require('babelify')
const watchify = require('watchify')
const exorcist = require('exorcist')
const browserify = require('browserify')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const Hexo = require('hexo');
const runSequence = require('run-sequence');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const run = require('gulp-run-command').default;

const gen_qr = require('./scripts/gen-qr');
const nightlies = require('./scripts/nightlies');

/* this usallly comes as a parameter from Jenkinsfile */
const env = process.env.ENV

// generate html with 'hexo generate'
var hexo = new Hexo(process.cwd(), {});

gulp.task('generate', function(cb) {
    hexo.init().then(function() {
        return hexo.call('generate', {
            config: `_config.${env}.yml`,
            watch: false,
        });
    }).then(function() {
        return hexo.exit();
    }).then(function() {
        return cb()
    }).catch(function(err) { console.log(err);
        hexo.exit(err);
        return cb(err);
    })
})

var config = {
    paths: {
        src: {
            scss: './themes/navy/source/scss/*.scss',
            js: './themes/navy/source/js/main.js',
        },
        dist: {
            css: './public/css',
            js: './public/js'
        }
    }
}

// Watchify args contains necessary cache options to achieve fast incremental bundles.
// See watchify readme for details. Adding debug true for source-map generation.
watchify.args.debug = true
// Input file.
var bundler = watchify(browserify(config.paths.src.js, watchify.args))

// Babel transform
bundler.transform(
    babelify.configure({
        sourceMapRelative: './themes/navy/source/js/'
    })
)

// On updates recompile
bundler.on('update', bundle)

function bundle() {
    log('Compiling JS...')

    return bundler
        .bundle()
        .on('error', function(err) {
            log(err.message)
            browserSync.notify('Browserify Error!')
            this.emit('end')
        })
        .pipe(exorcist('./themes/navy/source/js/vendor.js.map'))
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('./themes/navy/source/js'))
        .pipe(browserSync.stream({ once: true }))
}

gulp.task('compress', ['sass'], function() {
    gulp.src('./themes/navy/source/js/vendor.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
        }))
        .pipe(gulp.dest('./public/js/'))

    gulp.src('./public/css/main.css')
        .pipe(cleanCSS())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('nightlies', function() {
    return nightlies()
})

gulp.task('genqr', function() {
    gen_qr()
})

gulp.task('bundle', function() {
    return bundle()
})

gulp.task('sass', function() {
    return gulp.src("./themes/navy/source/scss/main.scss")
        .pipe(sass())
        .on('error', log)
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(browserSync.stream())
})

gulp.task('index', run(`hexo --config _config.${env}.yml elasticsearch`))

gulp.task('watch', function() {
    gulp.watch(config.paths.src.scss, ['compress'])
});

gulp.task('build', function(cb) {
    runSequence('nightlies', 'generate', 'compress', 'genqr', 'bundle', 'watch')
});

gulp.task('exit', function(cb) {
    process.exit(0);
});

gulp.task('run', function(cb) {
    runSequence('nightlies', 'generate', 'compress', 'genqr', 'bundle', 'exit')
    
});

gulp.task('default', [])
