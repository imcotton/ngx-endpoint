import { EndpointStore, Entry, IEndpointStore } from './endpoint-store';
import { Endpoint, IEndpoint } from './endpoint';
import { HashStore, IHashStore } from './utils';





describe('EndpointStore', function () {

    let endpoint: IEndpoint;
    let headers: IHashStore;
    let entry: Entry;
    let store: IEndpointStore;

    beforeEach(function () {

        endpoint = Endpoint('/api');
        headers = HashStore();

        entry = { endpoint, headers };

        store = EndpointStore();

    });



    it('init', function () {
        expect(EndpointStore).toBeTruthy();
    });

    it('find', function () {

        store.add(entry);

        expect(store.find(endpoint.to('/test'))).toBe(entry);
    });

    it('find nothing', function () {

        expect(store.find('/test')).toBeFalsy();
    });

    it('forbidden add same prefix', function () {

        store.add(entry);

        expect(() => store.add(entry)).toThrowError();

    });

});

