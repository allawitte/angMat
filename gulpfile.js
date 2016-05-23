'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),	
	//sprite = require('gulp-sprite-generator'),		
	webserver = require('gulp-webserver');	




var YOUR_LOCALS = {};
gulp.task('js', function(){
	gulp.src([		
		'bower_components/angular/angular.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-aria/angular-aria.js',
		'bower_components/angular-material/angular-material.js'		
		])			
		.pipe(concat('libs.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('build/dev'));	

	gulp.src([
			'build/dev/app/*.js',
			'build/dev/app/**/*.js',
			'!build/dev/app/**/*_test.js',
			])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/dev'));
});


gulp.task('app', function(){
	gulp.src([
			'build/dev/app/*.js',
			'build/dev/app/**/*.js',
			'!build/dev/app/**/*_test.js',
			])
		.pipe(concat('app.js'))		
		.pipe(gulp.dest('build/dev'));
});

gulp.task('css', function(){

	gulp.src([					
		'bower_components/angular-material/angular-material.css'			
		])
		.pipe(concat('theme.css'))
		.pipe(gulp.dest('build/dev'));
	

	gulp.src('build/dev/app/**/*.css')		
		.pipe(concat('app.css'))
		//autoprefix
		//minification
		.pipe(gulp.dest('build/dev'));
});

gulp.task('webserver', function(){
	gulp.src('build/dev/')
	.pipe(webserver({
		livereload : true,
		open : true
	}));
});


gulp.task('watch',function(){	
	gulp.watch('build/dev/app/**/*.js', ['js']);	
	gulp.watch('build/dev/app/**/*.css', ['css']);
	//gulp.watch('build/dev/app/**/*.*', ['app']);
});
//================  productions tasks  =====================

gulp.task('pjs', function(){
	gulp.src([
		'bower_components/jquery/dist/jquery.js',		
		'bower_components/bootstrap/dist/js/bootstrap.js',
		'bower_components/angular/angular.js',
		'bower_components/bower-angular-messages/angular-messages.js',
		'bower_components/ui-masks/mask.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-touch/angular-touch.js',
		'bower_components/angular-bootstrap/ui-bootstrap.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
		])
		.pipe(ngAnnotate())
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/prod'));

	

	gulp.src([
			'build/dev/app/*.js',
			'build/dev/app/**/*.js',
			'!build/dev/app/**/*_test.js',
			])
		.pipe(ngAnnotate())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/prod'));
});


gulp.task('pcss',function(){
	gulp.src([		
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',		
		])
		.pipe(concat('theme.css'))
		.pipe(minify())
		.pipe(gulp.dest('build/prod'));

		gulp.src('build/dev/app/**/*.scss')
		.pipe(scss())
		.pipe(concat('app.css'))
		//autoprefix
		.pipe(minify())
		.pipe(gulp.dest('build/prod'));
});

gulp.task('pwebserver', function(){
	gulp.src('build/prod/')
	.pipe(webserver({
		livereload : true,
		open : true
	}));
});
gulp.task('html', function(){
	gulp.src([
		'build/dev/app/**/*.html',
		'build/dev/*.html'
		])
	.pipe(gulp.dest('build/prod'));
})
gulp.task('pwatch',function(){
	gulp.watch('build/prod/app/**/*.js', ['js']);
	gulp.watch('build/prod/app/**/*.scss', ['css']);
	gulp.watch('build/prod/app/**/*.html', ['phtml']);
})

gulp.task('default', [
	'js',
	'compass',
	'css',
	'templates',
	'watch',
	'webserver'
	]);

gulp.task('prod',[
	'pjs',
	'pcss',
	'html',
	'pwatch',
	'pwebserver',
	])

