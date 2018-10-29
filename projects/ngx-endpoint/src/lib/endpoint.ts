import { not, join, mergePath } from './utils';





const genID = (function () {

    let id = 1;
    const prefixIDs = {} as Record<string, number>;

    return function (prefix: string) {

        if (not(prefix in prefixIDs)) {
            prefixIDs[prefix] = id;
            id += 1;
        }

        return prefixIDs[prefix];
    };

}());





export type IEndpoint = ReturnType<typeof Endpoint>;

export function Endpoint (prefix: string,
        {
            label = '',
        } = {},
) {

    const cache = {} as Record<string, string>;

    const key = join('', [
        '<',
        '#',
        genID(prefix).toString(),
        label && ':' + label,
        '>',
    ]);



    return Object.freeze({
        key,
        prefix,

        to,
        calibrate,
    });

    // ========================================================================

    function to (path: string, original = false) {
        return mergePath(original ? prefix : key, path);
    }

    // ------------------------------------------------------------------------

    function calibrate (url: string) {

        if (not(url in cache)) {
            cache[url] = to(url.replace(key, ''), true);
        }

        return cache[url];
    }

}

