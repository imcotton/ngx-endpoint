[![npm version](https://badge.fury.io/js/ngx-endpoint.svg)](https://www.npmjs.com/package/ngx-endpoint)
[![pipeline status](https://gitlab.com/imcotton/ngx-endpoint/badges/master/pipeline.svg)](https://gitlab.com/imcotton/ngx-endpoint/commits/master)
[![coverage report](https://gitlab.com/imcotton/ngx-endpoint/badges/master/coverage.svg)](https://gitlab.com/imcotton/ngx-endpoint/commits/master)

# ngx-endpoint

### Simplify **Angular** HTTP request API management.





## Installing

```bash
npm install ngx-endpoint --save
```





## Configuring

### **(1)** create one `EndpointService` which `extends` the `BaseEndpointService`

```typescript
import { Injectable } from '@angular/core';
import { BaseEndpointService } from 'ngx-endpoint';



@Injectable({
    providedIn: 'root',          // <---- only for Angular v6+, remove it in v4 or v5
})
export class EndpointService extends BaseEndpointService {

    readonly api = this.booking('/api/v1');   // <---- register it as API root

    readonly gitHub = this.booking('https://api.github.com');   // <---- another one



    protected onInit () {

        this.api.headers.add({
            'X-Powered-By': 'NgxEndpoint',    // <---- left a little mark on each call
        });

    }

}
```



### **(2)** wire up everything together

```typescript
import { HttpClientModule } from '@angular/common/http';

import { NgxEndpointModule, BaseEndpointService } from 'ngx-endpoint';

import { EndpointService } from 'app/endpoint-service';



@NgModule({
    imports: [
        HttpClientModule,

        NgxEndpointModule,    // <---- import module for NgxEndpoint
    ],
    providers: [

        // EndpointService,   // <---- uncomment this if in Angular v4 or v5

        {
            provide: BaseEndpointService,
            useExisting: EndpointService   // <---- tell Angular to use this one
        },

    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
```



### **(3)** let's ues this `api` in real service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EndpointService } from 'app/endpoint-service';



@Injectable()
export class MyService {

    constructor (
        private readonly http: HttpClient,
        private readonly endpoint: EndpointService,   // <---- inject EndpointService
    ) {
    }


    private readonly api = this.endpoint.api;   // <---- retrieve that api instance


    getInfo () {
        return this.http
            .get(this.api.to('/info'))   // <---- see, no api prefix assembling anymore
        ;
    }

    setOAuth (token: string) {
        this.api.set.OAuth(token);   // <---- assign OAuth2 token
    }

    setJWT (token: string) {
        this.api.set.JWT(token);   // <---- assign JWT token
    }

    setBasic (user: string, pass: string) {
        this.api.set.basic(user, pass);   // <---- assign Basic Auth credentials
    }

}
```



### **(4)** that's it, run the App, checkout the result.





## License

### the MIT

