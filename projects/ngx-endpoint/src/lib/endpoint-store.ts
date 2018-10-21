import { IHashStore } from './utils';
import { IEndpoint } from './endpoint';





export interface Entry {
    endpoint: IEndpoint;
    headers: IHashStore;
}





export function EndpointStore () {

    const store = [] as Entry[];

    return Object.freeze({ add, find });

    // ========================================================================

    function add (entry: Entry) {

        const { endpoint } = entry;

        const existing = find(endpoint.key);

        if (existing != null) {
            throw new Error(`Prefix [ ${ endpoint.prefix } ] already exists.`);
        }

        store.push(entry);
    }

    // ------------------------------------------------------------------------

    function find (url: string) {
        return store.find(({ endpoint }) => url.startsWith(endpoint.key));
    }

}

