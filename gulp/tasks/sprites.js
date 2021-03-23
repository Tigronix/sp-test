'use strict';

import merge from 'merge-stream';
import spritesmith from 'gulp.spritesmith';
import { src, dest } from 'gulp';
import { $, source, build, config } from '../config';
import 'path';

// SVG sprite
export const svgSprite = () => src(source.svgSprite)
    .pipe($.plumber())
    .pipe($.changed(source.svgSprite))
    .pipe($.svgSprite(config.svgSprite).on('error', (e) => console.log(e)))
    .pipe($.cheerio(config.cheerio))
    .pipe($.replace('&gt;', '>'))
    .pipe(dest(build.svgSprite));

// PNG sprite
export const pngSprite = () => {
    const spriteData = src(source.pngSprite)
        .pipe($.plumber())
        .pipe($.changed(source.pngSprite))
        .pipe(spritesmith(config.spriteSmith));

    const imgStream = spriteData.img
        .pipe($.plumber())
        .pipe(dest(build.pngSprite));

    const cssStream = spriteData.css
        .pipe($.plumber())
        .pipe(dest(build.pngSpriteCss));

    return merge(imgStream, cssStream);
};