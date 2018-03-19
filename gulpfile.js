/// <binding AfterBuild='templateCachingStuffForAppTests' Clean='clean' />

// This polyfill is required in the current VS version of NPM for use with cssnano.  It can likely be removed once Microsoft updates it.
require('es6-promise').polyfill();

// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var cssnano = require('gulp-cssnano');
var tslint = require('gulp-tslint');

gulp.task('clean', function () {
    return del([
        'JSTests/topaz.templates.js'
    ]);
});

// The bundleAndMinify task bundles and minifies all js and css files and copies font files to appropriate locations
gulp.task('bundleAndMinify', [
    'bundleAndMinifyJsLib',
    'bundleAndMinifyJsApp',
    'bundleAndMinifyCssLib',
    'bundleAndMinifyCssApp',
    'copyFontFiles',
    'copyUiGridFontFiles'
]);

// The bundleAndMinifyJsLib task bundles all third-party js libraries into one minified file
gulp.task('bundleAndMinifyJsLib', function () {
    return gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'Scripts/app.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/ui-select/dist/select.js',
            'bower_components/angular-ui-grid/ui-grid.js',
            'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
            'bower_components/checklist-model/checklist-model.js',
            'bower_components/ng-tags-input/ng-tags-input.js'
        ])
        .pipe(uglify())
        .pipe(concat('third-party.min.js'))
        .pipe(gulp.dest('js/'));
});

// The bundleAndMinifyJsApp task bundles all application js files into one minified file
gulp.task('bundleAndMinifyJsApp', function () {
    return gulp.src([
            'app/rsis/**/*.module.js',
            'app/rsis/**/*.js',
            'app/topaz/**/*.module.js',
            'app/topaz/**/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('topaz.min.js'))
        .pipe(gulp.dest('js/'));
});

// The bundleAndMinifyCssLib task bundles all third-party css files into one minified file
gulp.task('bundleAndMinifyCssLib', function () {
    return gulp.src([
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css',
            'bower_components/ui-select/dist/select.css',
            'bower_components/ng-tags-input/ng-tags-input.css',
            'bower_components/ng-tags-input/ng-tags-input.bootstrap.css',
            'bower_components/font-awesome/css/font-awesome.css',
            'bower_components/angular-ui-grid/ui-grid.css',
            'bower_components/angular-toastr/dist/angular-toastr.css'
        ])
        .pipe(cssnano())
        .pipe(concat('third-party.min.css'))
        .pipe(gulp.dest('css/'));
});

// The bundleAndMinifyCssLib task bundles all application css files into one minified file
gulp.task('bundleAndMinifyCssApp', function () {
    return gulp.src([
            'Content/base.css',
            'Content/style.css',
            'Content/app.css',
            'Content/ie8.css',
            'Content/blocks.css',
            'Content/plugins.css',
            'Content/plugins/animate.css',
            'Content/plugins/box-shadows.css',
            'Content/plugins/style-switcher.css',
            'Content/header-default.css',
            'Content/footer-default.css',
            'Content/footers/footer-v1.css',
            'Content/themes/app/*.css'
        ])
        .pipe(cssnano())
        .pipe(concat('topaz.min.css'))
        .pipe(gulp.dest('css/'));
});

// The copyFontFiles task moves font files from lib directories into the fonts directory
gulp.task('copyFontFiles', function () {
    return gulp.src([
            'bower_components/bootstrap/fonts/glyphicons-halflings-regular.eot',
            'bower_components/bootstrap/fonts/glyphicons-halflings-regular.svg',
            'bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf',
            'bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff',
            'bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2',
            'bower_components/font-awesome/fonts/fontawesome-webfont.eot',
            'bower_components/font-awesome/fonts/fontawesome-webfont.svg',
            'bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
            'bower_components/font-awesome/fonts/fontawesome-webfont.woff',
            'bower_components/font-awesome/fonts/fontawesome-webfont.woff2',
            'bower_components/font-awesome/fonts/FontAwesome.otf'
        ])
        .pipe(gulp.dest('fonts/'));
});

// The copyUiGridFontFiles task moves ui-grid font files from lib directories into the css directory
gulp.task('copyUiGridFontFiles', function () {
    return gulp.src([
            'bower_components/angular-ui-grid/ui-grid.eot',
            'bower_components/angular-ui-grid/ui-grid.svg',
            'bower_components/angular-ui-grid/ui-grid.ttf',
            'bower_components/angular-ui-grid/ui-grid.woff'
        ])
        .pipe(gulp.dest('css/'));
});

gulp.task('tsLint', function () {
    return gulp.src([
            'app/**/*.ts',
            'JSTests/**/*.ts'
        ])
        .pipe(tslint())
        .pipe(tslint.report('msbuild'));
});

//  Create a topaz.templates.js in our JSTests folder which is all .html files under app/topaz, but only for TESTS, right now
gulp.task('templateCachingStuffForAppTests', ['clean'], function () {
    return gulp.src('app/topaz/**/*.html')
        .pipe(minifyHtml({ empty: true }))
        .pipe(templateCache({
            module: 'topaz.tests',
            standalone: true, //  we DO want to create a new module
            moduleSystem: 'IIFE',
            root: 'app/topaz',
            filename: '../JSTests/topaz.templates.js'
        }))
        .pipe(gulp.dest('app/'));
});

//  how to migrate from NuGet to bower (need Mads Package Installer)
//  http://blog.chrisbriggsy.com/Migrate-from-nuGet-to-Bower/