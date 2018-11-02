[![npm version](https://badgen.net/npm/v/ngx-endpoint)](https://www.npmjs.com/package/ngx-endpoint)
[![CircleCI](https://circleci.com/gh/imcotton/ngx-endpoint.svg?style=shield)](https://circleci.com/gh/imcotton/ngx-endpoint)
[![quality gate](https://sonarcloud.io/api/project_badges/measure?project=imcotton_ngx-endpoint&metric=alert_status)](https://sonarcloud.io/dashboard?id=imcotton_ngx-endpoint)
[![quality gate - coverage](https://sonarcloud.io/api/project_badges/measure?project=imcotton_ngx-endpoint&metric=coverage)](https://sonarcloud.io/component_measures?id=imcotton_ngx-endpoint&metric=coverage)

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
  providedIn: 'root',          // <---- only for Angular v6+, remove it on v4 or v5
})
export class EndpointService extends BaseEndpointService {

  readonly api = this.booking('/api');   // <---- register as prefix

  readonly gitLab = this.booking('https://gitlab.com/api/v4');   // <---- another one



  protected onInit () {

    this.api.headers.add({
      'X-Powered-By': 'NgxEndpoint',    // <---- leaves small ink on future calling
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

    NgxEndpointModule,
  ],
  providers: [

    // EndpointService,   <---- need this if on Angular v4 or v5

    { provide: BaseEndpointService, useExisting: EndpointService },

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
    return this.http.get(this.api.to('/info'));   // <---- auto prefixed
  }

  setOAuth (token: string) {
    this.api.auth.OAuth2(token);   // <---- assign OAuth2 token
  }

  setJWT (token: string) {
    this.api.auth.JWT(token);   // <---- assign JWT token
  }

  setBasic (user: string, pass: string) {
    this.api.auth.basic(user, pass);   // <---- assign Basic Auth credentials
  }

}
```



### that's it.





## License

### the MIT

