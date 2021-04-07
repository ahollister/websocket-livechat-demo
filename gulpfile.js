// Dependencies
const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const sassGlob = require("gulp-sass-glob");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const browserSyncConfig = require("./browserSyncConfig.json");


// Some config data for our tasks
const config = {
	styles: {
		src: "assets/styles/style.scss",
		srcDir: "assets/styles/**/*.scss",
		dest: "dist/styles"
	},
	scripts: {
		src: [
			"assets/scripts/libs/*.js",
			"assets/scripts/**/*.js"
		],
		dest: "dist/scripts"
	},
	browserSync: browserSyncConfig
};

function styles() {
	return gulp.src(config.styles.src)
		.pipe(sourcemaps.init()) // Sourcemaps need to init before compilation
		.pipe(sassGlob()) // Allow for globbed @import statements in SCSS
		.pipe(sass({ outputStyle: "compressed" })) // Compile
		.on("error", sass.logError) // Error reporting
		.pipe(postcss([
			autoprefixer(), // Autoprefix resulting CSS
			tailwindcss(), // Tailwind CSS
			cssnano() // Minify
		]))
		.pipe(rename({ // Rename to .min.css
			suffix: ".min"
		}))
		.pipe(sourcemaps.write()) // Write the sourcemap files
		.pipe(cleanCSS({ rebase: false, level: { 1: { specialComments: 0 } } }))
		.pipe(gulp.dest(config.styles.dest)) // Drop the resulting CSS file in the specified dir
		.pipe(browserSync.stream());
}
exports.styles = styles; // Allows task to be run independently in command line: "gulp styles"

function scripts() {
	return gulp.src(config.scripts.src)
		.pipe(babel({
			presets: ["@babel/preset-env"]
		}))
		.pipe(concat("scripts.js")) // Concatenate
		.pipe(uglify()) // Minify + compress
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(browserSync.stream());
}
exports.scripts = scripts;

// Injects changes into browser
function browserSyncTask() {
	if (config.browserSync.active) {
		browserSync.init({
			proxy: config.browserSync.localURL,
			notify: false,
			https: config.browserSync.https
		});
	}
}

// Reloads browsers that are using browsersync
function browserSyncReload(done) {
	browserSync.reload();
	done();
}

// Watch directories, and run specific tasks on file changes
function watch() {
	gulp.watch(config.styles.srcDir, styles);
	gulp.watch(config.scripts.src, scripts);

	// Reload browsersync when PHP files change, if active
	if (config.browserSync.active) {
		gulp.watch("./**/*.php", browserSyncReload);
		gulp.watch("./**/*.twig", browserSyncReload);
	}
}
exports.watch = watch;

// What happens when we run gulp?
gulp.task("default",
	gulp.series(
		gulp.parallel(styles, scripts), // First run these tasks asynchronously
		gulp.parallel(watch, browserSyncTask) // Then start watching files and browsersyncing
	)
);