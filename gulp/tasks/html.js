'use strict';

import { src, dest } from 'gulp';
import { $, source, build, config } from '../config';

// HTML
const html = () => src(source.twig)
    .pipe($.plumber())
    .pipe($.changed(source.twig))
    .pipe($.twig())
    .pipe($.useref())
    .pipe($.beautifyCode())
    .pipe(dest(build.dest))

export default html;
