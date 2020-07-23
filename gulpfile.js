const log = require('fancy-log')
const gulp = require('gulp')
const webserver = require('gulp-webserver')
const postcss = require('gulp-postcss');
const gulpSass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const gulpMinify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create()
const Hexo = require('hexo');
const bamboo = require('./scripts/bamboo-hr');

const scriptGenqr = require('./scripts/gen-qr');
const gitBranch = require('./scripts/git-branch');
const updateBuilds = require('./scripts/update-builds');

// helper for determining env based on branch from which we build
const getEnv = () => {
    return gitBranch() == 'master' ? 'prod' : 'dev'
}

// loads hexo configuration based on env we build for
const hexo = async (cmd) => {
    var hexo = new Hexo(process.cwd(), {
        config: `_config.${getEnv()}.yml`,
        watch: false,
    })
    await hexo.init()
    await hexo.call(cmd)
    return await hexo.exit()
}

const content = () => hexo('generate')

const index = () => hexo('elasticsearch', {'delete': true})

const nightlies = () => updateBuilds('nightlies', 'latest.json')

const employees = () => bamboo.saveEmployees('source/_data/employees.yml')

const minify = () =>
    gulp.src('./themes/navy/source/js/main.js')
        .pipe(gulpMinify({ext:{min:'.min.js' }, mangle: true}))
        .pipe(gulp.dest('./public/js/'))

const sass = () =>
    gulp.src('./themes/navy/source/scss/main.scss')
        .on('error', log.error)
        .pipe(gulpSass())
        .pipe(postcss([require('tailwindcss'), require('autoprefixer')]))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())

const css = () =>
    gulp.src('./public/css/main.css')
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./public/css/'));

const genqr = async () => {
    await scriptGenqr('nightlies', 'APK',   './public/img', 'nightly-qr-apk.png')
    await scriptGenqr('nightlies', 'DIAWI', './public/img', 'nightly-qr-ios.png')
}

const devel = () => {
    gulp.watch('./themes/navy/source/scss/*.scss', sass, css)
    gulp.watch('./themes/navy/source/js/main.js', minify)
    gulp.watch(['./source/**/*.{md,yml}', './themes/navy/**/*'], content)
}

const server = () =>
  gulp.src('./public').pipe(webserver({
    port: 8080, livereload: true, open: true
  }));

exports.content = content
exports.sass = sass
exports.css = gulp.series(sass, css)
exports.genqr = genqr
exports.server = server
exports.index = index
exports.devel = gulp.parallel(server, devel)
exports.build = gulp.series(nightlies, gulp.parallel(genqr, content, exports.css, minify))
exports.default = exports.build
