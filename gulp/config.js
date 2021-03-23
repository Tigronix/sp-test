'use strict';

import gulpLoadPlugins from 'gulp-load-plugins';
import moduleImporter from 'sass-module-importer';
import { argv } from 'yargs';

const { PORT, OPEN } = process.env;
export const production = !!argv.production || !!argv.prod;
export const nominify = !!argv.nominify;
export const $ = gulpLoadPlugins();

export const source = {
    twig: './src/*.twig',
    subTwig: './src/templates/**/*.twig',
    css: './src/css/**/*.{sass,scss}',
    vendorJs: ['./src/js/vendor.js'],
    js: ['./src/js/main.js', '!./src/js/vendor.js'],
    subJs: './src/js/scripts/**/*.js',
    fonts: './src/fonts/*.{eot,ttf,woff,woff2,svg}',
    img: './src/img/**/*.{jpg,gif,svg,png}',
    src: './src',
    assets: './src/assets/**/*.*',
    svgSprite: './src/assets/svg_icons/**/*.svg',
    pngSprite: './src/assets/png_icons/**/*.png'
};

export const build = {
    dest: './build',
    css: './build/assets/css',
    scripts: './build/assets/js',
    assets: './build/assets',
    svgSprite: './src/templates/includes',
    pngSprite: './src/assets/img',
    pngSpriteCss: './src/css'
};

export const config = {
    browserSync: {
        port: PORT || 3000,
        open: !!OPEN,
        notify: false,
        reloadOnRestart: true,
        server: {
            baseDir: build.dest,
            directory: true
        }
    },

    autoprefixer: {
        cascade: false
    },

    sass: {
        importer: moduleImporter(),
        outputStyle: production ? 'compressed' : 'expanded'
    },

    include: {
        extensions: 'js',
        hardFail: true,
        includePaths: [
            `${ __dirname }/../node_modules`,
            `${ __dirname }/../bower_components`,
            `${ __dirname }/../src/js`
        ]
    },

    babel: {
        presets: ['env']
    },

    imagemin: {
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{
                removeViewBox: false
            }
        ]
    },

    spriteSmith: {
        imgName: 'png_sprite.png',
        imgPath: '../img/png_sprite.png',
        cssName: '_png_sprite.scss',
        cssFormat: 'scss',
        cssVarMap: function(sprite) {
            sprite.name = 'icon-' + sprite.name;
            sprite.prefix = 'i-';
        }
    },

    svgSprite: {
        mode: {
            symbol: {
                sprite: '../icons.svg'
            }
        },
        transform: [
                {svgo: {
                    plugins: [
                        { removeViewBox: false },
                        { removeUselessStrokeAndFill: false },
                        { cleanupIDs: false },
                        { mergePaths: false },
                        { removeUnknownsAndDefaults: false }
                    ]
                }}
            ],
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false,
            namespaceIDs: false
        }
    },

    cheerio: {
        run: function($) {
            // $('[fill]').removeAttr('fill');
            // $('[fill-rule]').removeAttr('fill-rule');
            // $('[style]').removeAttr('style');
        }
    }
};
