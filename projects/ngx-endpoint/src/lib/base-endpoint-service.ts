import { HashStore, headerGen } from './utils';

import { Endpoint } from './endpoint';
import { EndpointStore } from './endpoint-store';





export abstract class BaseEndpointService {

    private readonly store = EndpointStore();



    readonly find = this.store.find;



    protected booking (prefix: string,
            {
                label = '',
            } = {},
    ) {

        const endpoint = Endpoint(prefix, { label });
        const headers = HashStore();

        this.store.add({ endpoint, headers });



        return Object.freeze({

            prefix,

            headers,

            to: endpoint.to,

            set: Object.freeze({
                JWT: setBearer,
                OAuth: setBearer,
                basic: setBasic,
            }),

        });

        // ====================================================================

        function setBearer (credentials: string) {
            headers.add(headerGen.bearer(credentials));
        }

        // --------------------------------------------------------------------

        function setBasic (username: string, password: string) {
            headers.add(headerGen.basic(btoa(`${ username }:${ password }`)));
        }

    }


    protected abstract onInit (): void;

    // tslint:disable-next-line:member-ordering
    private readonly asyncInit = Promise.resolve().then(() => {
        if (this.asyncInit && this.onInit) {
            this.onInit();
        }
    });

}

