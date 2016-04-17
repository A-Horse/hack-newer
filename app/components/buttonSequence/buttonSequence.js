import {Component, Input, Output, ElementRef, EventEmitter, Hostlistener} from 'angular2/core';
import {Icon, Animation} from 'ionic';

import './buttonSequence.scss'

const buttonSize = 60;
const buttonGap = 30;
const buttonHideOpacity = 0.5;
//const marginToCorner = 30;

@Component({
    selector: 'button-sequence',
    template: `
    <div>
        <div class="sequence-button" (click)="toggle($event)">
            <ion-icon name="md-add"></ion-icon>
        </div>
        <div  class="buttons-container">
        <div *ngFor="#button of vButtons" [ngStyle]="{bottom: button.bottom, opacity: button.opacity}"
               (click)="buttonClick(button.fn, $event)" class="sequence-button v">
               <ion-icon [name]="button.icon"></ion-icon>
        <span class="button-txt" *ngIf="showButtons">{{ button.txt }}</span>
            </div>
      
        <div *ngFor="#button of hButtons" [ngStyle]="{right: button.right, opacity: button.opacity}"
               (click)="buttonClick(button.fn, $event)" class="sequence-button h">
               <ion-icon [name]="button.icon"></ion-icon>
        <span class="button-txt" *ngIf="showButtons">{{ button.txt }}</span>
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
        fn: any
    }> = [];
    // 垂直 buttons
    @Input() vButtons: Array<{
        icon: string,
        txt: string,
        fn: any
    }> = [];

    @Output() clicked = new EventEmitter();
    
    constructor(private elementRef :ElementRef) {

        this.vButtons.map((button) => {
            button.opacity = buttonHideOpacity;
        });
        this.hButtons.map((button) => {
            button.opacity = buttonHideOpacity;
        });
    }

    buttonClick(fn, e) {
        fn(e);
        this.toggle(e);
    }


    public toggle(event) {
        console.log('toggle');
        
        event.preventDefault();
        event.stopPropagation();
        
        this.showButtons = !this.showButtons;

        this.clicked.emit(this.showButtons);
        
        if( this.showButtons ){
            let b = 0;
            this.vButtons.map((button) => {
                b = buttonGap + buttonSize + b;
                button.bottom = b + 'px';
                button.opacity = 1;
            });

            b = 0;
            this.hButtons.map((button) => {
                b = buttonGap + buttonSize + b;
                button.right = b + 'px';
                button.opacity = 1;
            });
            
        } else {
            this.vButtons.map((button) => {
                button.bottom = null;
                button.opacity = buttonHideOpacity;
            });

            this.hButtons.map((button) => {
                button.right = null;
                button.opacity = buttonHideOpacity;
            });
        }



    }
    
}
