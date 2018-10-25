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

