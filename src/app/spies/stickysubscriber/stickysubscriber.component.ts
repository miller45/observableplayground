import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {CatinfoService, DoginfoService} from "../../services";
import {CatInfo, CatInfos} from "../../models";

@Component({
    selector: 'app-stickysubscriber',
    templateUrl: './stickysubscriber.component.html',
    styleUrls: ['./stickysubscriber.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StickySubscriberComponent implements OnInit, OnDestroy {

    public allCats: CatInfos = [];

    constructor(private toastr: ToastsManager, private catInfoService: CatinfoService, private dogInfoService: DoginfoService) {
    }

    public trackByFunction(index: number, item: CatInfo): any {
        return item.hash;
    }

    ngOnInit() {
        // this.dogInfoService.dogEvents.subscribe((event:DogEvent)=> {
        //     this.toastr.info("Getting Dog Events", "Still");
        // });
        this.catInfoService.getCatInfos().subscribe(
            (cats) => {
                this.toastr.info("i got new cats", "Incoming" + Date.now().toString());
                this.allCats = cats;
                console.log("got cats");
            }
        );
    }

    ngOnDestroy() {
        console.log(` ${this.constructor.name} has been destroyed`);
    }


}



