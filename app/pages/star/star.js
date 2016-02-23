import {Page, Icon, NavController, Storage, LocalStorage, Hostlistener} from 'ionic/ionic';


@Page({
    templateUrl: 'build/pages/star/star.html',
    directives: [Icon]
})
export class StarPage {
    constructor(nav: NavController) {
        this.local = new Storage(LocalStorage);
    }
}
