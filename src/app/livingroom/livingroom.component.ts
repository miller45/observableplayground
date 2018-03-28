import { Component, OnInit } from '@angular/core';
import { CatinfoService } from "../services";
import { CatInfos } from "../models";

@Component({
    selector: 'app-livingroom',
    templateUrl: './livingroom.component.html',
    styleUrls: ['./livingroom.component.css']
})
export class LivingroomComponent implements OnInit {

    public allCats: CatInfos;

    private counter = 0;

    constructor(private catInfoService: CatinfoService) {
    }

    ngOnInit() {
        this.catInfoService.getCatInfos().subscribe((kitties) => {
            this.allCats = kitties;
        });
    }

    public addCat(): void {
        this.counter++;
        this.catInfoService.addCat({name: `Garfield Nr ${this.counter}`, sleeping: true});
    }

}
