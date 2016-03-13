import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';

import {Injectable} from 'angular2/core'


@Injectable()
export class HacknewApi {

    constructor(http: Http) {
        this.http = http;

        //this.http.get('http://baidu.com')
            
    }

    log() {
        console.log('api!!!!!!!');
    }
}
