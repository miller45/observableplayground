import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FodderService} from "../services/index";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-pantry',
    templateUrl: './pantry.component.html',
    styleUrls: ['./pantry.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PantryComponent implements OnInit, OnDestroy {

    public fodderKindsDump: string;
    public fodderStockEntrysDump: string;
    private subscriptions: Array<Subscription> = [];

    constructor(private fodderService: FodderService) {
    }

    ngOnInit() {
        this.subscriptions.push(this.fodderService.getFodderKinds().subscribe((d) => {
            this.fodderKindsDump = JSON.stringify(d, null, 3);
        }));
        this.subscriptions.push(
            this.fodderService.getFodderStockEntrys().subscribe((d) => {
                this.fodderStockEntrysDump = JSON.stringify(d, null, 3);
            }));

    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub:Subscription)=> {
            if(sub) { sub.unsubscribe(); }
        });
    }

}
