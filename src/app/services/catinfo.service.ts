import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatInfo, CatInfos} from "../models";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {DoginfoService} from "./doginfo.service";


//const Names = ["Miez", "Heinz", "Kitty"];

let rnd = function (max: number) {
    return Math.trunc(Math.random() * max);
};

@Injectable()
export class CatinfoService {

    private catInfos$: ReplaySubject<CatInfos>;
    private allCats: CatInfos;

    constructor(private http: Http, private dogInfoService: DoginfoService) {
        this.catInfos$ = Observable.create(observer => {
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
        this.dogInfoService.dogEvents.subscribe((e)=> {
            console.log(e);
        });
    }

    public getCatInfos(): Observable<CatInfos> {
        return this.catInfos$;
    }

    public addCat(cat: CatInfo) {
        console.log("trying to add cat");
        this.catInfos$.subscribe(() => {
            console.log("added cat");
            this.allCats.push(cat);
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
