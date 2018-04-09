import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatInfo, CatInfos} from "../models";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {ReplaySubject} from "rxjs/ReplaySubject";

import * as _ from 'lodash';
import {Fodder} from "../models/fodder.model";
import {FodderStockEntry} from "../models/fodder-stock.model";
import {observable} from "rxjs/symbol/observable";
import {merge} from 'rxjs/observable/merge';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {of} from 'rxjs/observable/of';
import {race} from 'rxjs/operators';
import {concat} from 'rxjs/operators';
import {delay} from 'rxjs/operators';
import {pipe} from "rxjs/Rx";


let rnd = function (max: number) {
    return Math.trunc(Math.random() * max);
};

/**
 * load from loadstorage first and then add api contents and than put to localstorage
 */
@Injectable()
export class FodderService {

    private fodderKindsSubject: ReplaySubject<Array<Fodder>>;
    private fodderStockObservable: Observable<Array<FodderStockEntry>>;

    constructor(private http: Http) {

        this.fodderKindsSubject = Observable.create(observer => {
            this.http.get('http://localhost:4001/api/fodder').map((response) => {
                return FodderService.processFodderResult(response["_body"]);
            }).subscribe((data: any) => {
                observer.next(data);
                observer.complete();
            }, (error) => {
                console.log(error);
            });
        }).shareReplay(1);

        // this.fodderStockSubject = Observable.create(observer => {
        //     this.http.get('http://localhost:4001/api/fodder').map((response) => {
        //         return FodderService.processFodderStockResult(response["_body"]);
        //     }).subscribe((data: any) => {
        //         observer.next(data);
        //         observer.complete();
        //     }, (error) => {
        //         console.log(error);
        //     });
        // });
        let apiObs = this.http.get('http://localhost:4001/api/fodder').map((response) => {
            let res: Array<FodderStockEntry> = FodderService.processFodderStockResult(response["_body"]);
            //localStorage.setItem("playground.fodderStock",JSON.stringify(res) );
            return res;
        });
        this.fodderStockObservable = apiObs;
        let testObs: Observable<Array<FodderStockEntry>> = of(<FodderStockEntry[]>JSON.parse(localStorage.getItem("playground.fodderStock"))).pipe(delay(5000));
        this.fodderStockObservable = apiObs.pipe(concat(testObs));


        // this.fodderStockObservable = combineLatest(apiObs,testObs).switchMap((as,ts)=> {
        //     return as;
        // });

    }

    public getFooderKinds(): Observable<Array<Fodder>> {
        return this.fodderKindsSubject;
    }

    public getFooderStock(): Observable<Array<FodderStockEntry>> {
        return this.fodderStockObservable;
    }

    private static processFodderResult(responseBody: string): Array<Fodder> {
        //FYI: json contains list of fodder kinds and also stock info
        let rawkinds = JSON.parse(responseBody).Fodder.Kinds;
        let result: Array<Fodder> = [];
        let amount = rawkinds.length;
        for (let i = 0; i < amount; i++) {
            result.push({kind: rawkinds[i]});
        }
        return result;
    }

    private static processFodderStockResult(responseBody: string): Array<FodderStockEntry> {
        //FYI: json contains list of fodder kinds and also stock info
        let rawstocks = JSON.parse(responseBody).Fodder.Stock;
        let result: Array<FodderStockEntry> = [];
        _.forEach(rawstocks, (value: number, key: string) => {
            result.push(
                {
                    kind: key,
                    amount: value
                });
        });
        return result;
    }
}
