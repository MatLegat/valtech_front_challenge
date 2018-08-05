'use strict'

const gulp = require('gulp')


// Configure a Fractal instance:

const fractal = require('@frctl/fractal').create()

fractal.set('project.title', 'Valtech Card Component Library')
fractal.web.set('builder.dest', 'build')
fractal.docs.set('path', `${__dirname}/src/docs`)
fractal.components.set('path', `${__dirname}/src/components`)


// Fractal CLI console utility:
const logger = fractal.cli.console


// Compile and export project static assets:
const compileAssets = () => {
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
  compileAssets().then(start)
})
