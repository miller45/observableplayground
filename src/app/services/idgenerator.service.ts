/**
 * @author RKlein@rosen-group.com
 */
import {Injectable} from "@angular/core";

@Injectable()
export class IdGeneratorService {

    /** generate unique id (like GUID) */
    public makeUUID(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


}