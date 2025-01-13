const gulp = require("gulp");

gulp.task("html", () => {
  return gulp.src("./src/*.html").pipe(gulp.dest("./dist"));
});

gulp.task("watch", () => {
  gulp.watch("./src/*.html", gulp.series("html"));
});

gulp.task("default", gulp.series("html"));
