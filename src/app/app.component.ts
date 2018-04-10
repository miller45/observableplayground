import {Component, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import { ToastsManager } from "ng2-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./icofont/css/icofont.css'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {

    constructor(vcRef: ViewContainerRef,
                public toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(vcRef);
    }

  public title = 'observable playground app';
  public isVisible = false;

  showComponents() {
    this.isVisible = !this.isVisible;
  }
}
