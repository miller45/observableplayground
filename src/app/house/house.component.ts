import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CatinfoService, DoginfoService} from "../services";
import {CatInfos} from "../models";


@Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HouseComponent implements OnInit {

    public allCats: CatInfos;

    constructor(private catInfoService: CatinfoService, private dogInfoService: DoginfoService) {
    }

    ngOnInit() {
        this.catInfoService.getCatInfos().subscribe((kitties) => {
            this.allCats = kitties;
        });
    }

    public triggerDogEvent() {
        this.dogInfoService.makeRandomDogEvent();
    }

    public createRange(max: number) {
        let items: number[] = [];
        for (let i = 0; i < max; i++) {
            items.push(i);
        }
        return items;
    }

}
