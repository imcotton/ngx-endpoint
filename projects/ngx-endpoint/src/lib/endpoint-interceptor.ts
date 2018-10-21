import { Injectable } from '@angular/core';

import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseEndpointService } from './base-endpoint-service';





@Injectable()
export class EndpointInterceptor implements HttpInterceptor {

    constructor (
            private readonly endpointService: BaseEndpointService,
    ) {
    }



    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const entry = this.endpointService.find(req.url);

        if (entry != null) {
            req = req.clone({
                url: entry.endpoint.calibrate(req.url),
                setHeaders: entry.headers.clone(),
            });
        }

        return next.handle(req);
    }

}

