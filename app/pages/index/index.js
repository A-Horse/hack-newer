import {Page, Icon, NavController, Storage, LocalStorage, Hostlistener} from 'ionic';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import  * as _  from 'lodash';

import {timeDifference} from '../../util'

import {ButtonSequence} from '../../components/buttonSequence/buttonSequence';
import {WaveDirective} from '../../Directives/wave/wave';
//import {ChooseDirective} from '../../Directives/choose/choose';

import {StarPage} from '../star/star';

import 'rxjs/add/operator/map';

import './index.scss';
import './choose.scss';
import './common.scss';

const INIT_ITEM_N = 100;
const fetchNewMins = 5;

let fetchNewGap = 5 * 60 * 1000;

const apis = {
    'new': 'https://hacker-news.firebaseio.com/v0/topstories.json',
    top: 'https://hacker-news.firebaseio.com/v0/newstories.json',
    ask: 'https://hacker-news.firebaseio.com/v0/askstories.json',
    show: 'https://hacker-news.firebaseio.com/v0/showstories.json',
    job: 'https://hacker-news.firebaseio.com/v0/jobstories.json'
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

        this.category = this.local.get('category')._result || 'new';
        this.items = [];
        
        this.renderItemList(this.category);

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
                this.doRefresh();
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

    /*
     * 
     * Event
     *
     */
    doRefresh(refresher) {
        console.log('refresh');
        this.fetchItemsList(this.category, () => { refresher.complete(); });
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

    openUrl($event, url) {
        $event.preventDefault();
        $event.stopPropagation();
        window.open(url, '_blank', 'location=yes');
    }

    starItem($event, id) {
        $event.preventDefault();
        $event.stopPropagation();
        let starList = JSON.parse(this.local.get('star_list')._result) || [];
        
        starList.push(JSON.stringify({
            date: new Date(),
            itemId: id
        }));
        this.local.set('star_list', JSON.stringify(starList));
    }

    closeChoose(clicked) {
        if(!clicked)  {
            return;
        }
        let lastItem = this.opItem;
        if (!!lastItem || lastItem === 0) {
            this.items[lastItem].chooseMove = false;

            setTimeout(() => {
                this.items[lastItem].opChoose = false;
            }, 100);
        }
    }

    cardClick(item, i) {
        let lastItem = this.opItem;
        this.opItem = i;
        
        if ((!!lastItem || lastItem === 0) && lastItem !== i) {
            this.items[lastItem].chooseMove = false;

            setTimeout(() => {
                this.items[lastItem].opChoose = false;
            }, 100);
        }
        
        if (item.opChoose) {
            item.chooseMove = false;
            
            setTimeout(() => {
                item.opChoose = false;
            }, 100);
        } else {
            console.log('not')
            item.opChoose = true;
        
            setTimeout(() => {
                item.chooseMove = true;
            }, 100);
        }        
    }

    goStar($event, bs) {
        if (this.bsClicked) {
                bs.toggle($event);
        }
        this.nav.push(StarPage);
    }

    /*
     * 
     * Func
     *
     */

    calcTimeDistance(time) {
        return timeDifference(new Date().getTime(), time * 1000);
    }
    
    /*
     * 
     * LocalStorge
     *
     */
    
    setCategory(cate) {
        console.log(cate);
        this.category = cate;
        this.local.set('category', cate);        
    }

    setCateList(cate, list) {
        this.local.set('list_' + cate, list);
    }

    getItem(id) {
        return this.local.get('id_' + id)._result;
    }

    setItem(id, data) {
        this.local.set('id_' + id, data);
    }

    /*
     * 
     * Network
     *
     */
    
    fetchItemsList(cate, cb) {
        this.items = [];
        this.http.get(apis[cate])
        .map(res => res.json())
        .subscribe(
            data => {
                this.setCateList(cate, JSON.stringify(data));
                this.handleItemList(data, cate);
                cb && cb();
            },
            err => this.logError(err)
        );
    }

    refresh() {
        
    }

    renderItemList(cate) {
        let list = JSON.parse(this.local.get('list_' + cate)._result);

        if (!list) {
            console.log('fetch')
            this.fetchItemsList(cate);
        } else {
            console.log(list);
            this.handleItemList(list);
        }
    }
    
    handleItemList(data) {
        _.take(data, INIT_ITEM_N).map((itemId) => {
            this.handleItem(itemId);
        })
    }

    handleItem(id) {
        let lItem = this.getItem(id);

        if (lItem) {
            this.items.push(JSON.parse(lItem));
        } else {
            this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .map(res => JSON.parse(res.text()))
                .subscribe(
                    itemData => {
                        this.setItem(id, JSON.stringify(itemData));
                        console.log(itemData);
                        this.items.push(itemData);
                    },
                    err => this.logError(err)
                );
        }
    }

    loadMore() {
        
    }
    
    // TODO 
    logError(error) {
        console.log(error);
    }
}
