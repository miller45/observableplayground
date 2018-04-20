import {Component, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from "ng2-toastr";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', './icofont/css/icofont.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    constructor(vcRef: ViewContainerRef,
                public toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(vcRef);
        this.visibilities = [false, false, false, false, false];
    }

    public title = 'observable playground app';
    public isVisible = false;

    public visibilities: Array<Boolean> = [];

    public showComponents() {
        for (let i = 0; i < this.visibilities.length; i++) {
            this.visibilities[i] = true;
        }
    }

    public boxClick(event: Event, index: number) {
        if (! (event.srcElement && event.srcElement.tagName === "BUTTON")) {
            //only hide box if not a button click
            //console.log(event.srcElement.tagName);
            this.visibilities[index] = false;
        }

    }
}
