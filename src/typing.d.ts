// import React from 'react'
// import ReactDOM from 'react-dom'
// export { default as util } from './user'
import { Util } from '@util'
import react from 'react';
import { Moment } from 'moment'

interface Obj {
    [key: string]: any,
}

declare global {
    const util: Util;
    const moment;
    const md5;
}