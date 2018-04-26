/**
 * @author RKlein@rosen-group.com
 */

import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Subject } from "rxjs/Subject";



/**
 *  Converts a click vent to observable
 *  does not work currently
 */
@Directive({
    selector: '[appClickAsObservable]',
})
export class ClickAsObservableDirective {

    @Input('appClickAsObservable') testValue: string;

    @Input('putTo') putTo: Subject<Event> = new Subject<Event>();

    @HostListener('click', ['$event']) onButtonClick(event) {
        this.putTo.next(event);
    }

    constructor(private el: ElementRef) {

    }


}