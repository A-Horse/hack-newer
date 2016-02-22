import {Directive, ElementRef, Input, HostListener} from 'angular2/core';

import './choose.scss';

//const headerHeight = 44;

@Directive({
    selector: '[card-choose]'
})
export class ChooseDirective {
    
    constructor(private el: ElementRef) {
        // el.nativeElement.style.backgroundColor = 'yellow';
        this.buttons = [{
            icon: 'md-star',
            txt: 'Star',
            fn: ($event) => {
                console.log('star');
            }
        },{
            icon: 'md-star',
            txt: 'Star2',
            fn: ($event) => {
                console.log('star2');
            }
        }]
    }

    @HostListener('click', ['$event'])
    public onClick($event) {
        $event.preventDefault();

        /* let offsetX = $event.pageY - this.el.nativeElement.offsetTop + this.el.nativeElement.parentNode.scrollTop - headerHeight,
           offsetY = $event.pageX - this.el.nativeElement.offsetLeft - 25; */

        let cardHeight = this.el.nativeElement.clientHeight,
            cardWidth = this.el.nativeElement.clientWidth;

        let centerX = cardWidth / 2,
            centerY = cardHeight / 2;

        console.log($event);
        console.log(this.el);

        let container = document.createElement('div');

        container.classList.add('card-choose-container');
        container.style.top = centerX + 'px';
        container.style.left = centerY + 'px';

        this.buttons.map((button) => {
            let ct = document.createElement('div');
            ct.classList.add('choose-button');

            //let icon = document.

        });

        this.el.nativeElement.appendChild(container);
        
        
    }
    
    
}
