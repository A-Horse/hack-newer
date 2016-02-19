import {Component, Input, HostListener, ElementRef} from 'angular2/core';
import {Icon, Animation} from 'ionic/ionic';

import './buttonSequence.scss'

@Component({
    selector: 'sequence-button',
    template: `
        <div class="sequence-button">
            <ion-icon [name]="content.icon"></ion-icon>
        </div>`,
    host: {
        'class': 'button-sequence'
    },
    directives: [Icon],
    host: {
        style: 'content.style'
    }
})
export class SequenceButton {
    // 水平 buttons
    @Input() content;

    
    constructor(private _elementRef: ElementRef) {
        
    }

    public click(elem) {

        
        
    }
    
}
