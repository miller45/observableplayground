import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import { CatinfoService, DoginfoService, GlobalOptionsService } from "../../services";
import {CatInfo, CatInfos} from "../../models";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-stickysubscriber2',
    templateUrl: './stickysubscriber2.component.html',
    styleUrls: ['./stickysubscriber.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StickySubscriber2Component implements OnInit, OnDestroy {

    public allCatsObs: Observable<CatInfos>;

    private subscriptions: Array<Subscription> = [];
    private doNotUnsubscribe = false;


    constructor(private toastr: ToastsManager, private catInfoService: CatinfoService, private dogInfoService: DoginfoService, private goptions:GlobalOptionsService) {
        this.allCatsObs = this.catInfoService.getCatInfos();
        this.subscriptions.push(this.allCatsObs.subscribe());
    }

    public trackByFunction(index: number, item: CatInfo): any {
        return item.hash;
    }

    ngOnInit() {

        // this.dogInfoService.dogEvents.subscribe((event:DogEvent)=> {
        //     this.toastr.info("Getting Dog Events", "Still");
        // });

    }

    ngOnDestroy() {
        if(!this.doNotUnsubscribe) {
            this.subscriptions.forEach((sub) => {
                if (sub) {
                    sub.unsubscribe();
                }
            });
        }
        if(!this.goptions.silenceSpies) {
            console.log(` ${this.constructor.name} has been destroyed`);
        }

    }


}



