import {Component, Input, HostListener, ElementRef} from 'angular2/core';
import {Icon, Animation} from 'ionic/ionic';

import './buttonSequence.scss'

@Component({
    selector: 'button-sequence',
    template: `
    <div #ele>
        <div class="sequence-button" (click)="click(ele)">
            <ion-icon name="md-add"></ion-icon>
        </div>
        <div *ngIf="vButtons && showButtons" class="buttons-container">
            <div #ele *ngFor="#button of vButtons" class="sequence-button v">
                <ion-icon [name]="button.icon"></ion-icon>
            </div>
        </div>
        </div>`,
    host: {
        'class': 'button-sequence'
    },
    directives: [Icon]
})
export class ButtonSequence {
    // 水平 buttons
    private showButtons:bolean = false;
    
    @Input() hButtons: Array<{
        icon: string,
        txt: string,
    }> = [];
    // 垂直 buttons
    @Input() vButtons: Array<{
        icon: string,
        txt: string,
    }> = [];
    
    constructor(private _elementRef: ElementRef) {
        
    }

    public click(elem) {
        //event.preventDefault();
        //event.stopPropagation();
        
        
        this.showButtons = !this.showButtons;
        console.log('I\'m click!');


        if( this.showButtons ){
            console.log(this._elementRef.nativeElement);
            //console.log(elem.nativeElement.querySelector('div.v'));
            console.log(elem);
        } else {

        }



    }
    
}
