import { HttpHeaders } from '@angular/common/http';





export function not (value: any) {
    return !value;
}





export function join <T> (by: string, list: T[]) {
    return list.join(by);
}





export function mergePath (head: string, path: string) {

    const url = join('/', [ head, path ]);

    return url
        .replace(/\/+/g, '/')
        .replace('http:/', 'http://')
        .replace('https:/', 'https://')
    ;
}





export const headerGen = (function () {

    return Object.freeze({
        basic: build('Basic'),
        bearer: build('Bearer'),
    });

    // ========================================================================

    function build (type: 'Basic' | 'Bearer', header = 'Authorization') {
        return function (credentials: string) {
            return {
                [ header ]: `${ type } ${ credentials }`,
            };
        };
    }

}());





export type IHashStore = ReturnType<typeof HashStore>;

export function HashStore (store: Record<string, string> = {}) {

    return Object.freeze({

        add,

        clone () {
            return { ...store };
        },

    });

    // ========================================================================

    function add (obj: typeof store, append = true) {
        store = append ? { ...store, ...obj } : { ...obj };
    }

}





export type IHeaderStore = ReturnType<typeof HeaderStore>;

export function HeaderStore (store: HttpHeaders = new HttpHeaders()) {

    type Value = string | string[];

    const wrapper = Object.freeze({

        clone () {
            return store.append('THIS-IS-HACK', '');
        },

        append (name: string, value: Value) {
            store = store.append(name, value);
            return wrapper;
        },

        set (name: string, value: Value) {
            store = store.set(name, value);
            return wrapper;
        },

        delete (name: string, value?: Value) {
            store = store.delete(name, value);
            return wrapper;
        },

    });

    return wrapper;
}

