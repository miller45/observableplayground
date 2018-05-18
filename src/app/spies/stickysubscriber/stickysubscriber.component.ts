import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import { CatinfoService, DoginfoService, GlobalOptionsService } from "../../services";
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

    constructor(private toastr: ToastsManager, private catInfoService: CatinfoService, private dogInfoService: DoginfoService, private goptions:GlobalOptionsService) {
    }

    public trackByFunction(index: number, item: CatInfo): any {
        return item.hash;
    }

    ngOnInit() {
        this.subscriptions.push(this.dogInfoService.dogEvents.subscribe((event: DogEvent) => {
            this.toastr.info("Still Getting Dog Events", "StickySubscriber");
        }));
        this.subscriptions.push(this.catInfoService.getCatInfos().subscribe(
            (cats) => {
                if(!this.goptions.silenceSpies) {
                    this.toastr.info("i got new cats", "StickySubscriber " + Date.now().toString());
                    console.log("got cats");
                }
                this.allCats = cats;
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
        if(!this.goptions.silenceSpies) {
            console.log(` ${this.constructor.name} has been destroyed`);
        }
    }


}



