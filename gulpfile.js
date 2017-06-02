'use strict';

global.$ = {
  dev: true,
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    jsProcess: require('./gulp/paths/js.process.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  'sprite:png',
  $.gulp.parallel(
    'fonts',
    'sass',
    'pug',
    'js:foundation',
    'js:process',
    'copy:image',
    'css:foundation',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));