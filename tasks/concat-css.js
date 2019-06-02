module.exports = function (gulp, $, browserSync) {
	gulp.task('concat-css', function () {
		return gulp.src([
				'bower_components/font-awesome/css/font-awesome.min.css',
				'bower_components/animate.css/animate.min.css',
				// OWL
				'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
				'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
				// photoswipe
				'bower_components/photoswipe/dist/photoswipe.css',
				'bower_components/photoswipe/dist/default-skin/default-skin.css',
				// magic.css
				'node_modules/magic.css/dist/magic.min.css',
				// wenk tooltip
				'node_modules/wenk/dist/wenk.css'
			])
			.pipe($.concat('thuvien.css'))
			.pipe(gulp.dest('./dist/css'));
	});
};
