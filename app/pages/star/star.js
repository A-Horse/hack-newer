import {Page, Icon, NavController, Storage, LocalStorage, Hostlistener} from 'ionic';

import {HacknewApi} from '../../service/hacknew-api/hacknew-api'
import {CONFIG} from '../../config.js';


@Page({
    templateUrl: 'build/pages/star/star.html',
    directives: [Icon],
    providers: [HacknewApi]
})
export class StarPage {
    constructor(nav: NavController, hack: HacknewApi) {
        this.items = [];
        this.local = new Storage(LocalStorage);
        this.hackapi = hack;

        this.refresh();
    }

    refresh() {
        let starList = JSON.parse(this.local.get('star_list')._result);
        console.log(starList);
        _.take(starList, CONFIG.INIT_ITEM_N).map((starItem) => {
            let starItem = JSON.parse(starItem);
            this.hackapi.getItem(starItem.itemId, (data) => {
                this.renderItem(starItem.date, data);
            });
            
        });
    }

    renderItem(date, item) {
        console.log(item);
        this.items.push(item);
    }

    cardClick() {
        
    }
}
