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
        // console.log(this.el.nativeElement.parentNode.scrollTop);
        // console.log($event.y);
        // console.log(this.el.nativeElement.offsetTop);
        let ripple = document.createElement('div');
        ripple.classList.add('wave-ripple-effect');

        // 还要减去 content 的 scrollTop 的值
        ripple.style.top = ($event.pageY - this.el.nativeElement.offsetTop + this.el.nativeElement.parentNode.scrollTop - 44 - 25 ) + 'px'; // 44 为头部的高度
        ripple.style.left = ($event.pageX - this.el.nativeElement.offsetLeft - 25) + 'px';
        
        this.el.nativeElement.appendChild(ripple);

        setTimeout(() => {
            this.el.nativeElement.removeChild(ripple);
        }, 2000)

        // console.log(this.el)
        //console.log($event);
    }
    
    
}
