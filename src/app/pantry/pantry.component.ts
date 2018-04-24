import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FodderService} from "../services";
import {Subscription} from "rxjs/Subscription";

import {forkJoin as oForkJoin} from 'rxjs/observable/forkJoin';
import * as _ from 'lodash';
import {FodderStockDisplayEntry} from "../models/fodder-stock-display.model";
import {FodderItem} from "../models/fodder-item.model";
import {FodderKind} from "../models/fodder-kind.model";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-pantry',
    templateUrl: './pantry.component.html',
    styleUrls: ['./pantry.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PantryComponent implements OnInit, OnDestroy {
    public isDebugDump = false; //if ture all the fodderStuff is
    public fodderKindsDump: string;
    public fodderStockEntrysDump: string;
    public fodderItemsDump: string;
    private subscriptions: Array<Subscription> = [];

    public fodderDisplayObs: Observable<any> = null;

    constructor(private fodderService: FodderService) {
    }

    ngOnInit() {

        if (this.isDebugDump) {
            /**only needed when we not sure if everything is ok*/
            this.subscriptions.push(this.fodderService.getFodderKinds().subscribe((d) => {
                this.fodderKindsDump = JSON.stringify(d, null, 3);
            }));
            this.subscriptions.push(
                this.fodderService.getFodderStockEntrys().subscribe((d) => {
                    this.fodderStockEntrysDump = JSON.stringify(d, null, 3);
                }));
            this.subscriptions.push(
                this.fodderService.getFodderItems().subscribe((d) => {
                    this.fodderItemsDump = JSON.stringify(d, null, 3);
                }));
        }

        let joined = oForkJoin(
            this.fodderService.getFodderKinds(),
            this.fodderService.getFodderItems(),
            this.fodderService.getFodderStockEntrys(),
            (kinds, items, entrys) => {
                let res: Array<any> = [];
                entrys.forEach((e) => {
                    let csi = new FodderStockDisplayEntry(e);
                    let drefItem: FodderItem = _.find(items, {"ID": e.ItemREF});
                    csi.ItemName = drefItem.Name;
                    let drefKind: FodderKind = _.find(kinds, {"ID": drefItem.KindsREF});
                    csi.KindName = drefKind.Name;
                    res.push(csi);
                });
                return res;
            }
        );
        this.fodderDisplayObs = joined;
        // this.fodderDisplayObs = joined.map(([kinds, items, entrys]) => {
        //     console.log("forkjoing");
        //     let res: Array<any> = [];
        //     entrys.forEach((e) => {
        //         let csi = new FodderStockDisplayEntry(e);
        //         let drefItem: FodderItem = _.find(items, {"ID": e.ItemREF});
        //         csi.ItemName = drefItem.Name;
        //         let drefKind: FodderKind = _.find(kinds, {"ID": drefItem.KindsREF});
        //         csi.KindName = drefKind.Name;
        //         res.push(csi);
        //     });
        //     return res;
        // });


        //     .subscribe((endlich) => {
        //     console.log(endlich);
        // });

        // let combined = obsCombineLatest(this.fodderService.getFodderKinds(), this.fodderService.getFodderItems(), this.fodderService.getFodderStockEntrys,(kinds,items,stocke)=> {
        //     return {
        //       allKinds:kinds,
        //       allItems:items,
        //       allStockE:stocke
        //     };
        // });
        // combined.subscribe((allc)=> {
        //     console.log(JSON.stringify(allc,null,3));
        // });


    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub: Subscription) => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

}
