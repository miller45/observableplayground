import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {CatinfoService, DoginfoService} from "../../services";
import {CatInfo, CatInfos, DogEvent} from "../../models";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-stickysubscriber',
    templateUrl: './stickysubscriber.component.html',
    styleUrls: ['./stickysubscriber.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StickySubscriberComponent implements OnInit, OnDestroy {

    public allCats: CatInfos = [];
    private subscriptions: Array<Subscription> = [];
    private doNotUnsubscribe = false;

    constructor(private toastr: ToastsManager, private catInfoService: CatinfoService, private dogInfoService: DoginfoService) {
    }

    public trackByFunction(index: number, item: CatInfo): any {
        return item.hash;
    }

    ngOnInit() {
        this.subscriptions.push(this.dogInfoService.dogEvents.subscribe((event: DogEvent) => {
            this.toastr.info("Getting Dog Events", "Still");
        }));
        this.subscriptions.push(this.catInfoService.getCatInfos().subscribe(
            (cats) => {
                this.toastr.info("i got new cats", "Incoming" + Date.now().toString());
                this.allCats = cats;
                console.log("got cats");
            }
        ));
    }

    ngOnDestroy() {
        if(!this.doNotUnsubscribe) {
            this.subscriptions.forEach((sub) => {
                if (sub) {
                    sub.unsubscribe();
                }
            });
        }
        console.log(` ${this.constructor.name} has been destroyed`);
    }


}



