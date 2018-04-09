import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {FodderService} from "../../services";

@Component({
    selector: 'app-pantry',
    templateUrl: './pantry.component.html',
    styleUrls: ['./pantry.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PantryComponent implements OnInit {

    public dump: string;

    constructor(private fodderService: FodderService) {
    }

    ngOnInit() {
        // this.fodderService.getFooderKinds().subscribe((d)=> {
        //     this.dump=JSON.stringify(d);
        // });
        this.fodderService.getFooderStock().subscribe((d) => {
            this.dump = JSON.stringify(d);
        });

    }

}
