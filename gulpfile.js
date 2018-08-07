'use strict'

const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')


// Configure a Fractal instance:

const fractal = require('@frctl/fractal').create()

fractal.set('project.title', 'Valtech Card Component Library')
fractal.web.set('builder.dest', 'build')
fractal.docs.set('path', `${__dirname}/src/docs`)
fractal.web.set('static.path', `${__dirname}/build/public`)
fractal.components.set('path', `${__dirname}/src/components`)
fractal.components.set('default.preview', '@preview')


// Fractal CLI console utility:
const logger = fractal.cli.console


// Compile Sass styles:
const sassPath = `${__dirname}/src/components/**/*.scss`
const compileSass = () => {
  gulp.src([sassPath])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/public/css'))
}
const watchSass = () => {
  gulp.watch([sassPath])
    .on('change', compileSass)
}


// Copy static files to build path
const staticPath = `${__dirname}/src/static/**/*`
const copyStatic = () => {
  gulp.src(staticPath)
    .pipe(gulp.dest(`build/public/static/`))
}
const watchStatic = () => {
  gulp.watch([staticPath])
    .on('change', copyStatic)
}


// Compile and export project fractal assets:
const buildFractalAssets = () => {
  const builder = fractal.web.builder()
  builder.on(
    'progress',
    (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info')
  )
  builder.on('error', err => logger.error(err.message))
  return new Promise ((callback) => {
    builder.build().then(
      () => logger.success('Fractal build completed!')
    ).then(callback)
  })
}


// Start Fractal server:
const start = () => {
  const server = fractal.web.server({
    sync: true // BrowserSync: Auto refresh browser on file changes.
  })
  server.on('error', err => logger.error(err.message))  // Log errors.
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`)
  })
}


// Gulp build command:
gulp.task('build', () => {
  buildFractalAssets().then(() => {
    compileSass()
    watchSass()
    copyStatic()
    watchStatic()
    start()
  })
})
