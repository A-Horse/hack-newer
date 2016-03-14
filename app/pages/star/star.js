import {Page, Icon, NavController, Storage, LocalStorage, Hostlistener} from 'ionic/ionic';

import {HacknewApi} from '../../service/hacknew-api/hacknew-api'
import {CONFIG} from '../../config.js';
console.log(CONFIG);

@Page({
    templateUrl: 'build/pages/star/star.html',
    directives: [Icon],
    providers: [HacknewApi]
})
export class StarPage {
    constructor(nav: NavController, hack: HacknewApi) {
        this.item = [];
        this.local = new Storage(LocalStorage);
        this.hackapi = hack;
    }

    refresh() {
        let starList = this.local.get('star_list');
        console.log('star_list', starList);
        _.take(starList, CONFIG.INIT_ITEM_N).map((starItem) => {
            let data = this.hackapi.getItem(starItem.itemId);
            this.renderItem(starItem.date, data);
        });
    }

    renderItem(date, item) {
        
    }
}
