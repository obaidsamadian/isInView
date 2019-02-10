var gulp = require("gulp");
var ts = require("gulp-typescript");
const terser = require('gulp-terser');
var rename = require("gulp-rename");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest("dist"))
        .pipe(terser())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest("dist"));

});
