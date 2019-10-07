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
const bamboo = require('./scripts/bamboo-hr');

const genqr = require('./scripts/gen-qr');
const gitBranch = require('./scripts/git-branch');
const updateBuilds = require('./scripts/update-builds');

var config = {
    paths: {
        src: {
            scss: './themes/navy/source/scss/*.scss',
            js: [
                './themes/navy/source/js/main.js',
            ],
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

const bundle = () => {
    log('Compiling JS...')

    return bundler
        .bundle()
        .on('error', (err) => {
            log(err.message)
            browserSync.notify('Browserify Error!')
            this.emit('end')
        })
        .pipe(exorcist('./themes/navy/source/js/main.js.map'))
        .pipe(source('main.js'))
        .pipe(gulp.dest('./themes/navy/source/js'))
        .pipe(browserSync.stream({ once: true }))
}

// On updates recompile
bundler.on('update', bundle)

// helper functions

const getEnv = () => {
    return gitBranch() == 'master' ? 'prod' : 'dev'
}

const hexo = async (cmdName) => {
    var h = new Hexo(process.cwd(), {
        config: `_config.${getEnv()}.yml`,
        watch: false,
    })
    try {
        await h.init()
        await h.call(cmdName)
        await h.exit()
    } catch(err) {
        h.exit(err)
        throw err
    }
}

gulp.task('generate', async (cb) => {
    await hexo('generate') /* generate html with 'hexo generate' */
})

gulp.task('compress', ['sass'], () => {
    gulp.src('./themes/navy/source/js/main.js')
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

gulp.task('nightlies', () => {
    return updateBuilds('nightlies', 'latest.json')
})

gulp.task('releases', () => {
    return updateBuilds('releases', 'release.json')
})

gulp.task('employees', async () => {
    return bamboo.saveEmployees('source/_data/employees.yml')
})

gulp.task('genqr', () => {
    genqr('nightlies', 'APK',   'public/nightly/img', 'qr-apk.png')
    genqr('nightlies', 'DIAWI', 'public/nightly/img', 'qr-ios.png')
    genqr('releases',  'APK',   'public/stable/img',  'qr-apk.png')
    genqr('releases',  'DIAWI', 'public/stable/img',  'qr-ios.png')
})

gulp.task('bundle', () => {
    return bundle()
})

gulp.task('sass', () => {
    return gulp.src("./themes/navy/source/scss/main.scss")
        .pipe(sass())
        .on('error', log)
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(browserSync.stream())
})

gulp.task('index', async () => {
  await hexo('elasticsearch')
})

gulp.task('watch', async () => {
    gulp.watch(config.paths.src.scss, ['compress'])
});

gulp.task('build', (cb) => {
    runSequence('generate', 'compress', 'genqr', 'bundle', 'watch')
});

gulp.task('exit', (cb) => {
    process.exit(0);
});

gulp.task('run', (cb) => {
    runSequence('generate', 'compress', 'genqr', 'bundle', 'exit')
});

gulp.task('default', [])
