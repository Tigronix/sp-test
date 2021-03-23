'use strict';

import { task } from 'gulp';
import dev from './gulp/tasks/dev';
import build from './gulp/tasks/build';
import clean from './gulp/tasks/clean';

task('default', dev);
task('dev', dev);
task('build', build);

task('clean', clean);