import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ToastsManager } from "ng2-toastr";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', './icofont/css/icofont.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    public title = 'observable playground app';
    public visibilities: Array<Boolean> = [];

    constructor(vcRef: ViewContainerRef,
                public toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(vcRef);
        this.visibilities = [false, false, false, false, false];
    }

    public showComponents() {
        for (let i = 0; i < this.visibilities.length; i++) {
            this.visibilities[i] = true;
        }
    }

    public boxClick(event: Event, index: number) {
        if(event instanceof MouseEvent) {
            if(event.ctrlKey) {
                // only hide the box if ctrl key pressed
                //console.log(event.srcElement.tagName);
                this.visibilities[index] = false;
            }
        }
    }
}
