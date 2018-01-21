const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')
const eslint = require('gulp-eslint')
const gulpIf = require('gulp-if')
const runElectron = require('gulp-run-electron')
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
            filename: 'index.js'
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
    .pipe(gulp.dest('app/bin')))
gulp.task('clean:transpile', () => del(['app/bin']))

gulp.task('build', done => gulpSequence('lint', 'transpile')(done))
gulp.task('clean:build', done => gulpSequence('clean:transpile')(done))

gulp.task('run', () => gulp.src('app')
    .pipe(runElectron()))

gulp.task('default', gulpSequence('build', 'run'))

gulp.task('watch', ['build', 'run'], () => {
    gulp.watch([
        'src/**/*.es'
    ], ['build'])
})
