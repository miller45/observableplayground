import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {Dogevent, DogEventKind} from "../models";
import {Subject} from "rxjs/Subject";

let rnd = function (max: number) {
    return Math.trunc(Math.random() * max);
};

@Injectable()
export class DoginfoService {

    public dogEvents:Subject<Dogevent>;
    constructor() {
        this.dogEvents=new Subject<Dogevent>();
    }

    public makeRandomDogEvent() {
        let number=rnd(3);
        let ndg=new Dogevent();
        switch(number) {
            case 0:
                ndg.kind=DogEventKind.DogArrives;
                break;
            case 1:
                ndg.kind=DogEventKind.DogLeaves;
                break;
            case 2:
                ndg.kind=DogEventKind.DogBark;
                break;
        }
        this.dogEvents.next(ndg);
    }
}
