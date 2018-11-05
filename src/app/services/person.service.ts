import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Address } from "../models";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Person } from "../models/person";
import { NamesGenerator } from "./names-generator.service";

let rnd = function (max: number) {
    return Math.trunc(Math.random() * max);
};

/**only used for cookbook example */
@Injectable()
export class PersonService {


    constructor(private http: Http) {

    }

    public getPersonAddress(person: Person): Observable<Address> {
        let ngen = new NamesGenerator();
        let nadr = new Address();

        nadr.street = ngen.simple() + " Street";
        return Observable.of(nadr);
    }


}
