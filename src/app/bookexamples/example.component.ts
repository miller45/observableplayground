/**
 * @author RKlein@rosen-group.com
 */
import { CustomerService, EmailService } from "../services";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { WeatherInfo } from "../models";


import { of } from "rxjs/observable/of";
import { filter, map, reduce, switchMap } from "rxjs/operators";
import { pipe } from "rxjs/Rx";

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent {
    public complaintText: string = "";

    public weatherInfo: WeatherInfo;


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

    private doit() {
        const squareOdd = of(1, 2, 3, 4, 5)
            .pipe(
                filter(n => n % 2 !== 0),
                map(n => n * n)
            );

// Subscribe to get values
        squareOdd.subscribe(x => console.log(x));
    }

}


