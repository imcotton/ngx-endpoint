import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EndpointInterceptor } from './endpoint-interceptor';
import { BaseEndpointService } from './base-endpoint-service';





@NgModule({
    providers: [

        {
            provide: HTTP_INTERCEPTORS,
            useClass: EndpointInterceptor,
            multi: true,
            deps: [
                BaseEndpointService,
            ],
        },

    ],
})
export class NgxEndpointModule { }

