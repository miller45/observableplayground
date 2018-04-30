/**
 * @author RKlein@rosen-group.com
 */
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

/** fake email service*/
@Injectable()
export class EmailService {
    public sendEmailToBoss(message: string): Observable<number> {
        console.log(`sending message: ${message}`);
        let fakeEmailMessageId = Math.trunc(Math.random() * 10000);
        return Observable.of(fakeEmailMessageId).delay(800);
    }
}