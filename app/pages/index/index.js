import {Page, NavController} from 'ionic/ionic';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import  * as _  from 'lodash';

import {timeDifference} from '../../util'

import {ButtonSequence} from '../../components/buttonSequence/buttonSequence';

import 'rxjs/add/operator/map';

import './index.scss';

const LATEST_ITEM_N = 10;


@Page({
    templateUrl: 'build/pages/index/index.html',
    directives: [ButtonSequence]
})
export class IndexPage {
    constructor(nav: NavController, http: Http) {
        this.nav = nav;
        this.http = http;

        this.latestItems = [];
        
        this.http.get('https://hacker-news.firebaseio.com/v0/newstories.json')
            .map(res => JSON.parse(res.text()))
            .subscribe(
                data => this.handleItems(data),
                err => this.logError(err)
            );

        this.vButtons = [{
            icon: 'md-attach',
            txt: 'Attach'
            }, {
                icon: 'md-star',
                txt: 'Star'
            }]
    }

    openUrl(url) {
        window.open(url, '_blank', 'location=yes');
    }

    calcTimeDistance(time) {
        return timeDifference(new Date().getTime(), time * 1000);
    }
    
    handleItems(data) {
        let self = this;
        _.take(data, LATEST_ITEM_N).map((itemId) => {
            this.http.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
                .map(res => JSON.parse(res.text()))
                .subscribe(
                    itemData => {
                        console.log(itemData)
                        this.latestItems.push(itemData);
                    },
                    err => this.logError(err)
                );
        })
    }
    
    // TODO 
    logError(error) {
        console.log(error);
    }
}
