/**
 * @author RKlein@rosen-group.com
 */
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

/** demo email service*/
@Injectable()
export class EmailService {

    public sendEmailToBoss(message: string): Observable<number> {
        console.log(`sending message: ${message}`);
        let fakeEmailMessageId = Math.trunc(Math.random() * 10000);
        return Observable.of(fakeEmailMessageId).delay(800);
    }
    
    /**
     * get email signature for current user
     */
    public getEmailSignature(): Observable<string> {
        return this.readSettingFromDataBase("UserSettings.Email").map(
            (rawString: string) => {
                let settings: any = JSON.parse(rawString);
                return settings.EmailSettings.Signature;
            });
    }

    private readSettingFromDataBase(keyOfSetting: string): Observable<string> {
        // Here would be the code for reading the settings string from database. We return a fixed JSON string for demonstration here
        return Observable.of('{ "EmailSettings": { "Signature":"Yours sincerly, Mr. Longbottom" }, "ViewSettings": {  } }').delay(1000);
    }
}