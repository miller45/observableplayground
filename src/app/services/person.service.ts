import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Address, CatEvent, CatInfo, CatInfos } from "../models";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ReplaySubject } from "rxjs/ReplaySubject";

import * as _ from 'lodash';
import { NamesGenerator } from "./names-generator.service";
import { ToastsManager } from "ng2-toastr";
import { IdGeneratorService } from "./idgenerator.service";

import * as SparkMD5 from 'spark-md5';
import { Subject } from "rxjs/Subject";
import { Person } from "../models/person";

/**only used for cookbook example */
@Injectable()
export class PersonService {


    constructor(private http: Http) {

    }

    public getPersonAddress(person:Person):Observable<Address> {
        return Observable.of(new Address());
    }


}
