import {Page, Icon, NavController, Storage, LocalStorage, Hostlistener} from 'ionic/ionic';

import {HacknewApi} from '../../service/hacknew-api/hacknew-api'



@Page({
    templateUrl: 'build/pages/star/star.html',
    directives: [Icon],
    providers: [HacknewApi]
})
export class StarPage {
    constructor(nav: NavController, hack: HacknewApi) {
        this.local = new Storage(LocalStorage);

        hack.log();
    }

    refresh() {
        let starList = this.local.get('star_list');
        
    }
}
