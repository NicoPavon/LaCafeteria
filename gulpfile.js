const { src, dest, watch, series } = require('gulp');
//css y sass
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
//imagenes
const avif = require('gulp-avif');
const webp = require('gulp-webp'); 

function css(done){
src ('src/scss/app.scss')
.pipe(sass())
.pipe(postcss( [autoprefixer()] ))
.pipe(dest('build/css'))
done();
}

function imagenes(){
   return src('src/img/**/*')
    .pipe( dest('build/img'));
   
}

function versionWebp(){
    return src('src/img/**/*.{pnj,jpg}')
    .pipe(webp())
    .pipe(dest('build/img'))
}

function versionAvif(){
    return src('src/img/**/*.{pnj,jpg}')
    .pipe(avif())
    .pipe(dest('build/img'))
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev);