import { BaseEndpointService } from '../src/lib/base-endpoint-service';





describe('BaseEndpointService', function () {

    let service: EndpointService;

    class EndpointService extends BaseEndpointService {

        readonly api = this.booking('/api');

        protected onInit () { }

    }

    beforeEach(function () {

        service = new EndpointService();

    });



    test('init', function () {

        expect(service).toBeTruthy();

    });

    test('find', function () {

        expect(service.find(service.api.to('/test'))).toBeTruthy();

    });

    test('find nothing', function () {

        expect(service.find('foobar')).toBeUndefined();

    });

    test('bearer JWT', function () {

        const { api } = service;

        api.auth.JWT('foobar');

        expect(api.headers.clone()).toEqual({ Authorization: 'Bearer foobar' });

    });

    test('bearer OAuth2', function () {

        const { api } = service;

        api.auth.OAuth2('foobar');

        expect(api.headers.clone())
            .toEqual({ Authorization: 'Bearer foobar' })
        ;

    });

    test('basic auth', function () {

        const { api } = service;

        api.auth.basic('foo', 'bar');

        expect(api.headers.clone())
            .toEqual({ Authorization: 'Basic ' + btoa('foo:bar') })
        ;

    });

});

