'use strict';

import del from 'del';
import { build } from '../config';

// Clean
const clean = done => del(`${ build.dest }`, done);

export default clean;
