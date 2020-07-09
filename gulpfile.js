const gulp = require('gulp')
const log = require('fancy-log')
const source = require('vinyl-source-stream')
const babelify = require('babelify')
const watchify = require('watchify')
const exorcist = require('exorcist')
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

const postcss = require('gulp-postcss');

var config = {
    paths: {
        src: {
            scss: './themes/navy/source/scss/*.scss',
            js: [ './themes/navy/source/js/main.js', ],
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

// helper for determining env based on branch from which we build
const getEnv = () => {
    return gitBranch() == 'master' ? 'prod' : 'dev'
}

// loads hexo configuration based on env we build for
const hexo = async (cmdName, args={}) => {
    var h = new Hexo(process.cwd(), {
        config: `_config.${getEnv()}.yml`,
        watch: false,
    })
    try {
        await h.init()
        await h.call(cmdName, args)
        await h.exit()
    } catch(err) {
        h.exit(err)
        throw err
    }
}

gulp.task('generate', async (cb) => {
    await hexo('generate') /* generate html with 'hexo generate' */
})

gulp.task('minify', () => {
    return gulp.src('./themes/navy/source/js/main.js')
        .pipe(minify({ext:{min:'.min.js' }, mangle: true}))
        .pipe(gulp.dest('./public/js/'))
});

gulp.task('compress', ['sass'], () => {
    return gulp.src('./public/css/main.css')
        .pipe(cleanCSS())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('nightlies', () => {
    return updateBuilds('nightlies', 'latest.json')
})

gulp.task('employees', async () => {
    return bamboo.saveEmployees('source/_data/employees.yml')
})

gulp.task('genqr', () => {
    genqr('nightlies', 'APK',   'public/nightly/img', 'qr-apk.png')
    genqr('nightlies', 'DIAWI', 'public/nightly/img', 'qr-ios.png')
})

gulp.task('sass', () => {
    return gulp.src("./themes/navy/source/scss/application.scss")
        .pipe(sass())
        .pipe(postcss([
          require('tailwindcss'),
          require('autoprefixer')
        ]))
        .on('error', log)
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(browserSync.stream())
})

gulp.task('index', async () => {
  await hexo('elasticsearch', {'delete': true})
})

gulp.task('watch', async () => {
    gulp.watch(config.paths.src.scss, ['compress'])
    gulp.watch(config.paths.src.js, ['minify'])
});

gulp.task('build', (cb) => {
    runSequence('nightlies', 'generate', 'genqr', 'compress', 'minify', 'exit')
});

gulp.task('exit', (cb) => {
    process.exit(0);
});

gulp.task('default', [])
