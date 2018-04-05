import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatInfo, CatInfos} from "../models";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {ReplaySubject} from "rxjs/ReplaySubject";

import * as _ from 'lodash';
import {NamesGenerator} from "./names-generator.service";
import {ToastsManager} from "ng2-toastr";

let rnd = function (max: number) {
    return Math.trunc(Math.random() * max);
};

@Injectable()
export class CatinfoService {

    private catInfoSubject: ReplaySubject<CatInfos>;
    private allCats: CatInfos;
    private ngen:NamesGenerator;

    constructor(private http: Http,private toastr: ToastsManager) {
        this.ngen=new NamesGenerator();
        this.catInfoSubject = Observable.create(observer => {
            this.toastr.info("WebService", "Requested data from the webservice");
            this.http.get('http://localhost:4001/api/catinfo').map((response) => {
                return CatinfoService.processData(response["_body"]);
            }).subscribe((data: any) => {
                this.allCats = data;
                observer.next(data);
                observer.complete();
            }, (error) => {
                console.log(error);
            });
        }).shareReplay(1);
    }

    public getCatInfos(): Observable<CatInfos> {
        return this.catInfoSubject;
    }

    public addCat(cat: CatInfo) {
        this.catInfoSubject.subscribe(() => {
            this.allCats.push(cat);
        });
    }

    public addRandomCats(amount:number) {
        this.catInfoSubject.subscribe(() => {
            while (amount > 0) {
                let newCat = new CatInfo();
                newCat.name = this.ngen.simple();
                newCat.sleeping = rnd(1) === 1;
                this.allCats.push(newCat);
                amount--;
            }

        });
    }

    public removeCat(cat: CatInfo) {
        this.catInfoSubject.subscribe(() => {
            let acatidx = _.findIndex(this.allCats, {'name': cat.name});
            if (acatidx > -1) {
                this.allCats.splice(acatidx, 1);
            }
        });
    }

    public removeRandomCats(amount: number) {
        this.catInfoSubject.subscribe(() => {
            while (amount > 0) {
                let idx = rnd(this.allCats.length);
                this.allCats.splice(idx, 1);
                amount--;
            }
        });
    }

    private static processData(responseBody: string): CatInfos {
        let names = JSON.parse(responseBody).Cats.Names;
        let result: CatInfos = [];
        let amount = names.length;
        for (let i = 0; i < amount; i++) {
            let isSleeping: boolean = (rnd(1) === 1);
            result.push({name: names[i], sleeping: isSleeping});
        }
        return result;
    }
}
