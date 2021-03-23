'use strict';

import browserSync from 'browser-sync';
import { config } from '../config';

// Server
export const server = () => browserSync.init(config.browserSync);

// Reload server
export const reload = callback => {
    browserSync.reload();
    callback();
};
