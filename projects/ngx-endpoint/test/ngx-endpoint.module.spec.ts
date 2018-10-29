import { TestBed, TestBedStatic } from '@angular/core/testing';

import { NgxEndpointModule } from '../src/lib/ngx-endpoint.module';
import { BaseEndpointService } from '../src/lib/base-endpoint-service';





describe('NgxEndpointModule', () => {

    let bed: TestBedStatic;

    class EndpointService extends BaseEndpointService {

        protected onInit () {
        }

    }

    beforeEach(function () {

        bed = TestBed.configureTestingModule({
            imports: [ NgxEndpointModule ],
            providers: [
                EndpointService,
                { provide: BaseEndpointService, useExisting: EndpointService },
            ],
        });
    });



    it('init', function () {

        expect(bed.get(BaseEndpointService)).toBe(bed.get(EndpointService));

    });

});

