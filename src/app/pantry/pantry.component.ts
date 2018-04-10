import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FodderService} from "../services/index";

@Component({
    selector: 'app-pantry',
    templateUrl: './pantry.component.html',
    styleUrls: ['./pantry.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PantryComponent implements OnInit {

    public fodderKindsDump: string;
    public fodderStockEntrysDump: string;

    constructor(private fodderService: FodderService) {
    }

    ngOnInit() {
        this.fodderService.getFodderKinds().subscribe((d) => {
            this.fodderKindsDump = JSON.stringify(d, null, 3);
        });
        this.fodderService.getFodderStockEntrys().subscribe((d) => {
            this.fodderStockEntrysDump = JSON.stringify(d, null, 3);
        });

    }

}
