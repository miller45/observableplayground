import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/finally';


import {FodderStockEntry} from "../models/fodder-stock.model";
import {of} from 'rxjs/observable/of';
import {concat} from 'rxjs/operators';
import {ToastsManager} from "ng2-toastr";
import {FodderKind} from "../models/fodder-kind.model";
import {FodderItem} from "../models/fodder-item.model";


let rnd = function (max: number) {
    return Math.trunc(Math.random() * max);
};

/**
 * load from loadstorage first and then add api contents and than put to localstorage
 */
@Injectable()
export class FodderService {

    private fodderKindsObservable: Observable<Array<FodderKind>>;
    private fodderStockObservable: Observable<Array<FodderStockEntry>>;
    private fodderItemsObservable: Observable<Array<FodderItem>>;

    constructor(private http: Http, private toastMgr: ToastsManager) {

        this.fodderKindsObservable =
            this.http.get('http://localhost:4001/api/fodder').map((response) => {
                return FodderService.processFodderKindResult(response["_body"]);
            });
        this.fodderItemsObservable =
            this.http.get('http://localhost:4001/api/fodder').map((response) => {
                return FodderService.processFodderItemResult(response["_body"]);
            });

        let slowObservable = this.http.get('http://localhost:4001/api/fodder').map((response) => {
            let res: Array<FodderStockEntry> = FodderService.processFodderStockResult(response["_body"]);
            return res;
        }).delay(5000).do((items) => {
            //console.log("items stored in local storage");
            //localStorage.setItem("playground.fodderStock", JSON.stringify(items.slice(0,2)));
        }); //extra delay because local server is too fast
        let fastObservable: Observable<Array<FodderStockEntry>> = of(<FodderStockEntry[]>JSON.parse(localStorage.getItem("playground.fodderStock"))).do(()=> {
            console.log("read items from localstorage fast");
        });
        this.fodderStockObservable = fastObservable.pipe(concat(slowObservable));

        //example with observable create
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


        // this.fodderStockObservable.finally(()=> {
        //     this.toastMgr.info("Finnaly got all data","Finally completed");
        // });

        // this.fodderStockObservable = combineLatest(apiObs,testObs).switchMap((as,ts)=> {
        //     return as;
        // });

    }


    public getFodderKinds(): Observable<Array<FodderKind>> {
        return this.fodderKindsObservable;
    }

    public getFodderStockEntrys(): Observable<Array<FodderStockEntry>> {
        return this.fodderStockObservable;
    }

    public getFodderItems(): Observable<Array<FodderItem>> {
        return this.fodderItemsObservable;
    }

    private static processFodderKindResult(responseBody: string): Array<FodderKind> {
        //FYI: json contains list of fodder kinds and also stock info
        let rawkinds = JSON.parse(responseBody).Fodder.Kinds;
        let result: Array<FodderKind> = [];
        let amount = rawkinds.length;
        for (let i = 0; i < amount; i++) {
            result.push(rawkinds[i]);
        }
        return result;
    }

    private static processFodderItemResult(responseBody: string): Array<FodderItem> {

        let rawItems = JSON.parse(responseBody).Fodder.Items;
        let result: Array<FodderItem> = [];
        let amount = rawItems.length;
        for (let i = 0; i < amount; i++) {
            result.push(rawItems[i]);
        }
        return result;
    }

    private static processFodderStockResult(responseBody: string): Array<FodderStockEntry> {
        //FYI: json contains list of fodder kinds and also stock info
        let rawstocks = JSON.parse(responseBody).Fodder.Stock;
        let result: Array<FodderStockEntry> = [];
        rawstocks.forEach((st) => {
            result.push(st);
        });

        return result;
    }
}
