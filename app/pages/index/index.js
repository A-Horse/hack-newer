import {Page, Icon, NavController, Storage, LocalStorage, Hostlistener} from 'ionic/ionic';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import  * as _  from 'lodash';

import {timeDifference} from '../../util'

import {ButtonSequence} from '../../components/buttonSequence/buttonSequence';
import {WaveDirective} from '../../Directives/wave/wave';
//import {ChooseDirective} from '../../Directives/choose/choose'; 

import 'rxjs/add/operator/map';

import './index.scss';
import './choose.scss';

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
    directives: [Icon, ButtonSequence, WaveDirective]
})
export class IndexPage {
    constructor(nav: NavController, http: Http) {
        this.nav = nav;
        this.http = http;

        this.opItem = null;
        
        this.bsClicked = false;
        
        this.local = new Storage(LocalStorage);

        this.category = this.local.get('category') || 'new';
        
        this.items = [];
        
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

    contentClick($event, bs) {
        console.log($event)
        $event.preventDefault();
        $event.stopPropagation();
        console.log('-------')
        if (this.bsClicked) {
            bs.toggle($event);
        }
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
    
    openUrl($event, url) {
        console.log('url');
        $event.preventDefault();
        $event.stopPropagation();
        //window.open(url, '_blank', 'location=yes');
    }

    starItem($event, id) {
        console.log('star');
        $event.preventDefault();
        $event.stopPropagation();
    }

    cardClick(item, i) {
        let lastItem = this.opItem;
        this.opItem = i;
        if ((!!lastItem || lastItem === 0) && lastItem !== i) {
            this.items[lastItem].chooseMove = false;

            setTimeout(() => {
                this.items[lastItem].opChoose = false;
            }, 500);
        }

        
        
        if (item.opChoose) {
            item.chooseMove = false;

            setTimeout(() => {
                item.opChoose = false;
            }, 500);
        } else {
            item.opChoose = true;
        
            setTimeout(() => {
                item.chooseMove = true;
            });
        }
        
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
                        this.items.push(itemData);
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
