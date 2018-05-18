import { Injectable } from "@angular/core";

/**
 * service for providing all components and services access to global "application" options
 */
@Injectable()
export class GlobalOptionsService {
    /** silence messages from stickysubscribes that are to debug */
    public silenceSpies:boolean;
    /** add component instance ids into toastsmessages **/
    public instanceIdsInToasts:boolean;
}