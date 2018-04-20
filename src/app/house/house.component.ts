import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CatinfoService, DoginfoService} from "../services";
import {CatInfos} from "../models";
import {ToastsManager} from "ng2-toastr";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HouseComponent implements OnInit {

    public allCats: CatInfos;
    private subscriptions: Array<Subscription> = [];

    constructor(private catInfoService: CatinfoService, private dogInfoService: DoginfoService, private toastr:ToastsManager) {
    }

    ngOnInit() {
        this.catInfoService.getCatInfos().subscribe((kitties) => {
            this.allCats = kitties;
        });
    }

    public triggerDogEvent() {
        this.dogInfoService.makeRandomDogEvent();
    }

    public showSubscribers() {
        let a=this.dogInfoService.getObserverCount();
        let c=this.catInfoService.getObserverCount();
        let msg=`Number of observers for dogs: ${a}\r\n`;
        msg+=`Number of observers for cats ${c}`;
        this.toastr.warning(msg,'Yo');
    }

    // public createRange(max: number) {
    //     let items: number[] = [];
    //     for (let i = 0; i < max; i++) {
    //         items.push(i);
    //     }
    //     return items;
    // }

}
