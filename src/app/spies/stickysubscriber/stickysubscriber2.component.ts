import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {CatinfoService, DoginfoService} from "../../services";
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


    constructor(private toastr: ToastsManager, private catInfoService: CatinfoService, private dogInfoService: DoginfoService) {
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
        console.log(` ${this.constructor.name} has been destroyed`);
    }


}



