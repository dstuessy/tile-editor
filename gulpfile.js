const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')
const eslint = require('gulp-eslint')
const gulpIf = require('gulp-if')
const browserSync = require('browser-sync')
const del = require('del')
const yargs = require('yargs')
const webpack = require('webpack-stream')

const argv = yargs.argv
const isFixed = (file) => file.esling !== null && file.eslint.fixed

gulp.task('lint', () => gulp.src([
    'src/**/*.es',
    '*.js'])
    .pipe(eslint({
        fix: !!argv.fix
    }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('.'))))

gulp.task('transpile', () => gulp.src('src/main.es')
    .pipe(webpack({
        devtool: 'source-map',
        output: {
            filename: 'main.js'
        },
        resolve: {
            extensions: ['.js', '.es']
        },
        module: {
            rules: [
                {
                    test: /\.es$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                }
            ]
        }
    }))
    .pipe(gulp.dest('run/bin')))
gulp.task('clean:transpile', () => del(['run/bin/boxman.{js,js.map}']))

gulp.task('build', done => gulpSequence('lint', 'transpile')(done))
gulp.task('clean:build', done => gulpSequence('clean:transpile')(done))

gulp.task('default', ['build'])

gulp.task('watch', ['build'], () => {
    browserSync({
        server: './run'
    })

    gulp.watch('src/**/*.es', () => gulpSequence('build')(browserSync.reload))
})
