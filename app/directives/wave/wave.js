import {Directive, ElementRef, Input, HostListener} from 'angular2/core';

import './wave.scss';

@Directive({
    selector: '[wave]',
    host: {
      'class': 'wave-ripple'
    }
})
export class WaveDirective {
    
    constructor(private el: ElementRef) {
        // el.nativeElement.style.backgroundColor = 'yellow';
    }

    @HostListener('click', ['$event'])
    public onClick($event) {
        $event.preventDefault();
        let elHeight = this.el.nativeElement.clientHeight,
            elWidth = this.el.nativeElement.clientWidth;

        let ripple = document.createElement('div');
        ripple.classList.add('wave-ripple-effect');
      ripple.style.top = ($event.pageX  - 25) + 'px';
        ripple.style.left = $event.layerX - 25 + 'px';
        
        this.el.nativeElement.appendChild(ripple);

        console.log(this.el)
        console.log($event);
    }
    
    
}
