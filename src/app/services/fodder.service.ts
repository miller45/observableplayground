import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/finally';

import * as _ from 'lodash';
import {Fodder} from "../models/fodder.model";
import {FodderStockEntry} from "../models/fodder-stock.model";
import {of} from 'rxjs/observable/of';
import {concat} from 'rxjs/operators';
import {ToastsManager} from "ng2-toastr";


let rnd = function (max: number) {
    return Math.trunc(Math.random() * max);
};

/**
 * load from loadstorage first and then add api contents and than put to localstorage
 */
@Injectable()
export class FodderService {

    private fodderKindsObservable: Observable<Array<Fodder>>;
    private fodderStockObservable: Observable<Array<FodderStockEntry>>;

    constructor(private http: Http, private toastMgr: ToastsManager) {

        this.fodderKindsObservable =
            this.http.get('http://localhost:4001/api/fodder').map((response) => {
                return FodderService.processFodderResult(response["_body"]);
            });

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
        let slowObservable = this.http.get('http://localhost:4001/api/fodder').map((response) => {
            let res: Array<FodderStockEntry> = FodderService.processFodderStockResult(response["_body"]);
            //localStorage.setItem("playground.fodderStock",JSON.stringify(res) );
            return res;
        }).delay(5000); //extra delay because local server is too fast
        let fastObservable: Observable<Array<FodderStockEntry>> = of(<FodderStockEntry[]>JSON.parse(localStorage.getItem("playground.fodderStock")));
        this.fodderStockObservable = fastObservable.pipe(concat(slowObservable));
        // this.fodderStockObservable.finally(()=> {
        //     this.toastMgr.info("Finnaly got all data","Finally completed");
        // });

        // this.fodderStockObservable = combineLatest(apiObs,testObs).switchMap((as,ts)=> {
        //     return as;
        // });

    }

    public getFodderKinds(): Observable<Array<Fodder>> {
        return this.fodderKindsObservable;
    }

    public getFodderStockEntrys(): Observable<Array<FodderStockEntry>> {
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
