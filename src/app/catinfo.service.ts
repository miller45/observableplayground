import {Injectable} from '@angular/core';
import {CatInfo, CatInfos} from "./catinfo.model";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import {ReplaySubject} from "rxjs/ReplaySubject";


const Names = ["Miez", "Heinz", "Kitty"];

let rnd = function (max: number) {
  return Math.trunc(Math.random() * max);
};

@Injectable()
export class CatinfoService {

  private catInfos$: ReplaySubject<CatInfos>;
  private allCats: CatInfos;

  constructor() {
    let that = this;
    this.catInfos$ = Observable.create(observer => {
      setTimeout(() => {
        let data = that.getData();
        observer.next(data);
        that.allCats = data;
          observer.complete();
      }, 2000);
    }).shareReplay(1);
  }

  public getCatInfos(): Observable<CatInfos> {
    return this.catInfos$;
  }

  public addCat(cat: CatInfo) {
    console.log("trying to add cat");
    this.catInfos$.subscribe(()=> {
        console.log("added cat");
        this.allCats.push(cat);
    });
  }

  private getData(): CatInfos {
    console.log("data loaded");
    let result: CatInfos = [];
    let amount: number = rnd(10);
    for (let i = 0; i < amount; i++) {
      let kidx = rnd(3);
      let isSleeping: boolean = (rnd(1) === 1);
      result.push({name: Names[kidx], sleeping: isSleeping});
    }
    return result;
  }
}
