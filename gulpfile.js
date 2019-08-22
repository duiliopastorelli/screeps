const gulp = require('gulp');
const screeps = require('gulp-screeps');
const credentials = require('./credentials.js');
const { watch } = require('gulp');
const src = ['*.js', '!credentials.js'];

function pushToScreeps() {
    gulp.src(src)
        .pipe(screeps(credentials));
}

gulp.task('screeps', function () {
    pushToScreeps();
});

gulp.task('watch', function () {
    watch(src, function (cb) {
        console.log('Source changed');
        pushToScreeps();
        cb();
    });
})