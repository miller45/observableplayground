import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CatinfoService, DoginfoService, GlobalOptionsService } from "../services";
import { CatInfos, DogEvent, DogEventKind } from "../models";
import { ToastsManager } from "ng2-toastr";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-livingroom',
    templateUrl: './livingroom.component.html',
    styleUrls: ['./livingroom.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LivingroomComponent implements OnInit, OnDestroy {

    public allCats: CatInfos;

    private subscriptions: Array<Subscription> = [];

    private counter = 0;

    private randomInstanceID = 0;

    constructor(private catInfoService: CatinfoService, private dogInfoService: DoginfoService, private toastr: ToastsManager, private goptions: GlobalOptionsService) {
        console.log("New living room component created");
        this.randomInstanceID = Math.random() * 10000000;
    }

    ngOnInit() {
        this.subscriptions.push(this.catInfoService.getCatInfos().subscribe((kitties) => {
            this.allCats = kitties;
        }));
        this.subscriptions.push(this.dogInfoService.dogEvents.subscribe((evt: DogEvent) => {

            switch (evt.kind) {
                case DogEventKind.DogBark:
                    this.toastr.warning("Dog Barks", "LivingRoom" + this.getExtraText());
                    this.catInfoService.removeRandomCats(1);
                    break;
                case DogEventKind.DogLeaves:
                    this.toastr.success("Dog Leaves", "LivingRoom" + this.getExtraText());
                    this.catInfoService.addRandomCats(2);
                    break;
                case DogEventKind.DogArrives:
                    this.toastr.error("Dog Arrives", "LivingRoom" + +this.getExtraText());
                    this.catInfoService.removeRandomCats(2);
                    break;
            }
        }));
    }

    ngOnDestroy() {
        console.log("liviing room destroyed");
        this.subscriptions.forEach((sub: Subscription) => {
            sub.unsubscribe();
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

    public renameCat() {
        this.allCats[0].name = this.allCats[0].name + "X";
    }

    private getExtraText() {
        if (this.goptions.instanceIdsInToasts) {
            return this.randomInstanceID.toString();
        }
        return "";
    }

}
