// var compress_images = require('compress-images'), INPUT_path_to_your_images, OUTPUT_path;
 
// // INPUT_path_to_your_images = 'src/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
// INPUT_path_to_your_images = 'docs/**/*.png';
// OUTPUT_path = 'build/img/';

// compress_images(INPUT_path_to_your_images, OUTPUT_path, {compress_force: false, statistic: true, autoupdate: true}, false,
//                                             {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
//                                             {png: {engine: 'pngquant', command: ['--quality=20-50']}},
//                                             {svg: {engine: 'svgo', command: '--multipass'}},
//                                             {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, 
//                                             function(error, completed, statistic){
//             console.log('-------------');
//             console.log(error);
//             console.log(completed);
//             console.log(statistic);
//             console.log('-------------');                                   
// });

// const imagemin = require('imagemin');
// // const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');
 
// (async () => {
//     const files = await imagemin(['docs/**/*.png'], {
//         destination: 'build/images',
//         plugins: [
//             // imageminJpegtran(),
//             imageminPngquant({
//                 quality: [0.6, 0.8]
//             })
//         ]
//     });
 
//     console.log(files);
//     //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
// })();

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

exports.default = () => (
	gulp.src('docs/**/*.png')
		.pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            // imagemin.optipng({optimizationLevel: 5}),
            pngquant({quality: [0.4, 0.6]}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
		.pipe(gulp.dest('build/images'))
);

