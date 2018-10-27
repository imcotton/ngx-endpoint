import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController,

} from '@angular/common/http/testing';

import { NgxEndpointModule } from './ngx-endpoint.module';
import { BaseEndpointService } from './base-endpoint-service';






describe('EndpointInterceptor', function () {

    let endpoint: EndpointService;
    let service: SampleService;
    let httpMock: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,

                NgxEndpointModule,
            ],
            providers: [
                EndpointService,
                {
                    provide: BaseEndpointService,
                    useExisting: EndpointService,
                },
                SampleService,
            ],
        });

        endpoint = TestBed.get(EndpointService);
        service = TestBed.get(SampleService);
        httpMock = TestBed.get(HttpTestingController);

    });

    afterEach(function () {
        httpMock.verify();
    });



    test('init', function () {
        expect(service).toBeTruthy();
    });

    test('prefix', function () {

        service.getInfo().toPromise();

        const url = endpoint.api.to('/info', true);
        const req = httpMock.expectOne(url);

        expect(req.request.url).toBe(url);

    });

    test('not prefix', function () {

        service.getOther().toPromise();

        const req = httpMock.expectOne('/other');

        expect(req.request.url).toBe('/other');

    });

    test('request headers', function () {

        service.getInfo().toPromise();

        const url = endpoint.api.to('/info', true);
        const { request } = httpMock.expectOne(url);

        expect(request.headers.has('X-Powered-By'));
        expect(request.headers.get('X-Powered-By')).toBe('NgxEndpoint');

        expect(request.headers.has('foo'));
        expect(request.headers.get('foo')).toBe('bar');

    });

    test('auth header: Bearer', function () {

        endpoint.api.auth.OAuth2('hello');

        service.getInfo().toPromise();

        const url = endpoint.api.to('/info', true);
        const { request } = httpMock.expectOne(url);

        expect(request.headers.has('Authorization'));
        expect(request.headers.get('Authorization')).toBe('Bearer hello');

    });

    test('auth header: Basic', function () {

        endpoint.api.auth.basic('foo', 'bar');

        service.getInfo().toPromise();

        const url = endpoint.api.to('/info', true);
        const { request } = httpMock.expectOne(url);

        expect(request.headers.has('Authorization'));

        expect(request.headers.get('Authorization'))
            .toBe('Basic ' + btoa('foo:bar'))
        ;

    });

});





class EndpointService extends BaseEndpointService {

    readonly api = this.booking('/api');

    protected onInit () {
        this.api.headers.add({
            'X-Powered-By': 'NgxEndpoint',
        });
    }

}



@Injectable()
class SampleService {

    constructor (
        private readonly http: HttpClient,
        private readonly endpoint: EndpointService,
    ) {
    }



    private readonly api = this.endpoint.api;



    getInfo () {
        return this.http.get(this.api.to('/info'), {
            headers: new HttpHeaders({ foo: 'bar' }),
        });
    }

    getOther () {
        return this.http.get('/other');
    }

}

