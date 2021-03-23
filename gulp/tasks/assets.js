'use strict';

import { src, dest } from 'gulp';
import { production, $, source, build, config } from '../config';

// Assets
const assets = () => src(source.assets)
    .pipe($.plumber())
    .pipe($.changed(source.assets))
    .pipe($.if(production, $.imagemin(config.imagemin)))
    .pipe(dest(build.assets));

export default assets;