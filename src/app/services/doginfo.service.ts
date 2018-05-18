import {Injectable} from '@angular/core';


import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {DogEvent, DogEventKind} from "../models";
import {Subject} from "rxjs/Subject";

let rnd = function (max: number) {
    return Math.trunc(Math.random() * max);
};

@Injectable()
export class DoginfoService {

    public dogEvents: Subject<DogEvent>;

    constructor() {
        this.dogEvents = new Subject<DogEvent>();
    }

    public makeRandomDogEvent() {
        let number = rnd(3);
        let ndg = new DogEvent();
        switch (number) {
            case 0:
                ndg.kind = DogEventKind.DogArrives;
                break;
            case 1:
                ndg.kind = DogEventKind.DogLeaves;
                break;
            case 2:
                ndg.kind = DogEventKind.DogBark;
                break;
        }
        this.dogEvents.next(ndg);
        // following code there to test out if the event subscribtion "ends" when complete() is called
        // if(ndg.kind===DogEventKind.DogLeaves) {
        //     this.dogEvents.complete();
        // }
    }

    public getObserverCount() {
        return this.dogEvents.observers.length;
    }
}
