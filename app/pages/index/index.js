import {Page, NavController, Storage, LocalStorage, Hostlistener} from 'ionic/ionic';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import  * as _  from 'lodash';

import {timeDifference} from '../../util'

import {ButtonSequence} from '../../components/buttonSequence/buttonSequence';

import 'rxjs/add/operator/map';

import './index.scss';

const LATEST_ITEM_N = 10;
const fetchNewMins = 5;

let fetchNewGap = 5 * 60 * 1000;

const apis = {
    'new': 'https://hacker-news.firebaseio.com/v0/topstories',
    top: 'https://hacker-news.firebaseio.com/v0/newstories',
    ask: 'https://hacker-news.firebaseio.com/v0/askstories',
    show: 'https://hacker-news.firebaseio.com/v0/showstories',
    job: 'https://hacker-news.firebaseio.com/v0/jobstories'
}

@Page({
    templateUrl: 'build/pages/index/index.html',
    directives: [ButtonSequence]
})
export class IndexPage {
    constructor(nav: NavController, http: Http) {
        this.nav = nav;
        this.http = http;

        this.local = new Storage(LocalStorage);

        this.category = this.local.get('category') || 'new';
        
        this.latestItems = [];
        
        this.http.get('https://hacker-news.firebaseio.com/v0/newstories.json')
            .map(res => JSON.parse(res.text()))
            .subscribe(
                data => this.handleItems(data),
                err => this.logError(err)
            );

        this.vButtons = [{
            icon: 'md-barcode',
            txt: 'new'
        }, {
            icon: 'md-analytics',
            txt: 'top'
        }, {
            icon: 'md-bulb',
            txt: 'ask'
        }, {
            icon: 'logo-linkedin',
            txt: 'job'
        }, {
            icon: 'md-easel',
            txt: 'show'
        }];

        this.vButtons.map((button) => {
            button.fn = () => {
                this.setCategory(button.txt);
            };
        });

        this.hButtons = [{
            icon: 'moon',
            txt: 'moon',
            fn:  (event) => {
                if (this.hButtons[0].icon === 'moon') {
                    this.hButtons[0].icon = 'md-sunny';
                    this.hButtons[0].txt = 'sun';
                } else {
                    this.hButtons[0].icon = 'moon';
                    this.hButtons[0].txt = 'moon';
                }
            }
        }]
    }

    
    setCategory(cate) {
        console.log(cate);
        this.category = cate;
        this.local.set('category', cate);
    }
    
    fetchItemsList() {
        let t = new Date().getTime(),
            prevTime = this.local.get('fetchTime');
        if (prevTime) {            
            if (t - prevTime > fetchNewGap) {
                refresh();
            }
        } else {
            this.local.set('fetchTime', t);
        }
    }

    refresh() {
        
        
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
