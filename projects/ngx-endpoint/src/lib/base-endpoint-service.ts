import { HashStore, headerGen } from './utils';

import { Endpoint } from './endpoint';
import { EndpointStore } from './endpoint-store';





export abstract class BaseEndpointService {

    private readonly store = EndpointStore();



    readonly find = this.store.find;



    protected readonly booking = (prefix: string,
            {
                label = '',
            } = {},
    ) => {

        const endpoint = Endpoint(prefix, { label });
        const headers = HashStore();

        this.store.add({ endpoint, headers });



        return Object.freeze({

            prefix,

            headers,

            to: endpoint.to,

            auth: Object.freeze({
                JWT: setBearer,
                OAuth2: setBearer,
                basic: setBasic,
            }),

        });

        // ====================================================================

        function setBearer (credentials: string, type?: string, header?: string) {
            headers.add(headerGen.bearer(credentials, { type, header }));
        }

        // --------------------------------------------------------------------

        function setBasic (username: string, password: string) {
            headers.add(headerGen.basic(btoa(`${ username }:${ password }`)));
        }

    }


    protected abstract onInit (this: this): void;

    // tslint:disable-next-line:member-ordering
    private readonly asyncInit = Promise.resolve().then(() => {
        this.asyncInit.then(() => this.onInit());
    });

}

