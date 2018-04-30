/**
 * @author RKlein@rosen-group.com
 */
import { CustomerService } from "../services";
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent {
    public complaintText: string = "";

    constructor(private customerService: CustomerService) {

    }

    public submitFeedback() {
        if(this.complaintText) {
            this.customerService.saveCustomerComplaint("This new thing is crap");
        }

    }
}