/**
 * @author RKlein@rosen-group.com
 */
import { CustomerService, EmailService } from "../services";
import { Component, ViewEncapsulation } from "@angular/core";
import { CatInfo } from "../models";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent {
    public complaintText: string = "";



    constructor(private customerService: CustomerService, private emailService: EmailService) {

    }

    public submitFeedback() {
        if (this.complaintText) {
            this.customerService.saveCustomerComplaint("This new thing is crap");
        }

    }

    public showSignature() {
        this.emailService.getEmailSignature().subscribe((text) => {
            this.complaintText = text;
        });
    }
}