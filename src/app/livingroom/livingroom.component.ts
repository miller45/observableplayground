import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CatinfoService, DoginfoService} from "../services";
import {CatInfos, Dogevent, DogEventKind} from "../models";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-livingroom',
    templateUrl: './livingroom.component.html',
    styleUrls: ['./livingroom.component.css'],
    encapsulation:ViewEncapsulation.None
})
export class LivingroomComponent implements OnInit {

    public allCats: CatInfos;

    private counter = 0;

    constructor(private catInfoService: CatinfoService, private dogInfoService:DoginfoService,private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.catInfoService.getCatInfos().subscribe((kitties) => {
            this.allCats = kitties;
        });
        this.dogInfoService.dogEvents.subscribe((evt:Dogevent)=> {

           switch(evt.kind) {
               case DogEventKind.DogBark:
                   this.toastr.warning("wuuh","Dog Barks");
                   this.catInfoService.removeRandomCats(1);
                   break;
               case DogEventKind.DogLeaves:
                   this.toastr.success("wuuh","Dog Leaves");
                   this.catInfoService.addRandomCats(2);
                   break;
               case DogEventKind.DogArrives:
                   this.toastr.error("wuuh","Dog Arrives");
                   this.catInfoService.removeRandomCats(2);
                   break;
           }
        });
}

    public addCat() {
        this.counter++;
        //this.catInfoService.addCat({name: `Garfield Nr ${this.counter}`, sleeping: true});
        this.catInfoService.addRandomCats(1);
    }

    public removeCat() {
        this.catInfoService.removeRandomCats(1);
        this.counter--;
    }

}
