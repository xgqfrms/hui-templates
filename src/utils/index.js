
"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2018.12.29
 * @modified 2018.12.29
 *
 * @description
 * @augments
 * @example
 *
 */

const d = new Date();

let yyyy = d.getFullYear(),
    mm = d.getMonth() + 1,
    dd = d.getDate(),
    ts = d.getTime();

const TODAY = `${yyyy}-${mm > 9 ? mm : `0${mm}`}-${dd > 9 ? dd : `0${dd}`}`;

const TODAY_Begin = `${TODAY} 00:00:00`;

const TODAY_End = `${TODAY} 23:59:59`;

const TODAY_TimeStamp = `${ts}`;

const urlQueryStringToObject = (query = ``) => {
    let result = {};
    if (query) {
        result = query
        .map(
            (item) => {
                let arr = item.split(`=`);
                let obj = {};
                obj[arr[0]] = arr[1];
                return obj;
            }
        );
    } else {
        result = window.location.search.slice(1).split(`&`)
        .map(
            (item) => {
                let arr = item.split(`=`);
                let obj = {};
                obj[arr[0]] = arr[1];
                return obj;
            }
        );
    }
    return result;
};

const UQSTO = urlQueryStringToObject;

const Utils = {
    TODAY,
    TODAY_Begin,
    TODAY_End,
    TODAY_TimeStamp,
    UQSTO,
};

export default Utils;

export {
    TODAY,
    TODAY_Begin,
    TODAY_End,
    TODAY_TimeStamp,
    UQSTO,
};

