const gulp = require('gulp');
const less = require('gulp-less');
const minify = require('gulp-minify');
const path = require('path');
const rename = require("gulp-rename");
const watch = require('gulp-watch');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

// Need to specify one by one so that concat happens in the right order
const js_sources = 
[
	'./src/canvas-components-util.js',
	'./src/canvas-components-collection.js',
	'./src/components/component-enum.js',
	'./src/components/component-events.js',
	'./src/components/component.js',
	'./src/components/button.js',
	'./src/components/checkbox.js',
	'./src/components/panel.js',
	'./src/components/radio.js',
	'./src/components/text-input.js',
	'./src/components/label.js',
	'./src/components/range-slider.js',
	'./src/components/progress-bar.js',
	'./src/components/component-label.js',
	'./src/components/component-editable-text.js',
	'./src/canvas-components.js'
];

gulp.task('default', ['minify'], function(cb) 
{

});

gulp.task('build', ['minify'], function()
{

});

gulp.task('watch', function() 
{
	livereload.listen(
	{
		host: '127.0.0.1',
		port: 8886
	});

    watch(js_sources).on('change', function(e) 
	{
        gulp.start('minify');
        livereload.changed(e);
    });
});

gulp.task('minify', function()
{
	gulp.src(js_sources)
	.pipe(sourcemaps.init())
	.pipe(babel(
	{
		presets: ['@babel/env']
	}))
	.pipe(minify(
	{
		ext:
		{
			src:'.js',
			min:'.js'
		},
		exclude: ['compiled', 'bundle'],
		ignoreFiles: ['.min.js', '-min.js'],
		noSource: true
	}))
	.pipe(concat('canvas-components.min.js', { newLine: ';' }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./build/'))
});