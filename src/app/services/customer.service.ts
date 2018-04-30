/**
 * @author RKlein@rosen-group.com
 */
import { Observable } from "rxjs/Observable";
import { EmailService } from "./emailservice";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomerService {
    constructor(private emailService: EmailService) {
    }

    /**
     * save a customer complaint
     * @param complaintNotes text of the customer complaint
     * @return ticket number
     */
    public saveCustomerComplaint(complaintNotes: string): Observable<number>
    {
        return this.saveComplaintToDatabase(complaintNotes).do(
            (ticketNumber) => {
                this.emailService.sendEmailToBoss(
                `Hey boss. There was an angry customer. The ticket number is: ${ticketNumber}`
            );
        });
    }

    private saveComplaintToDatabase(complaintNotes: string): Observable<number>
    {
        //here would be all code for storing the notes via a webservice
        //but we simulate it with a delay and return a random number as ticket number
        let fakeTicketNumber = Math.trunc(complaintNotes.length + Math.random() * 10000);
        return Observable.of(fakeTicketNumber).delay(1000);
    }
}