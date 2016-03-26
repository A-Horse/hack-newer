import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Storage, LocalStorage} from 'ionic';
import {Injectable} from 'angular2/core';

const apis = {
    'new': 'https://hacker-news.firebaseio.com/v0/topstories.json',
    top: 'https://hacker-news.firebaseio.com/v0/newstories.json',
    ask: 'https://hacker-news.firebaseio.com/v0/askstories.json',
    show: 'https://hacker-news.firebaseio.com/v0/showstories.json',
    job: 'https://hacker-news.firebaseio.com/v0/jobstories.json'
}

@Injectable()
export class HacknewApi {

    constructor(http: Http) {
        this.http = http;
        this.local = new Storage(LocalStorage);
    }

    setCateList(cate, list) {
        this.local.set('list_' + cate, list);
    }

    getItem(id, cb) {
        let sData = this.local.get('id_' + id)._result;
        if (sData) {
            cb(sData);
        } else {
            this.fetchItem(id, cb);
        }
    }

    setItem(id, data) {
        this.local.set('id_' + id, data);
    }

    fetchItem(id, cb) {
        this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .map(res => JSON.parse(res.text()))
            .subscribe(cb, this.logError);
    }

    fetchItemsList(cate, cb) {
            this.http.get(apis[cate])
                .map(res => res.json())
                .subscribe(cb, this.logError);
    }

    logError(error) {
        console.log(error);
    }
}
