import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CatinfoService, DoginfoService } from "../services";
import { CatInfos } from "../models";
import { ToastsManager } from "ng2-toastr";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import { Subject } from "rxjs/Subject";


@Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HouseComponent implements OnInit, AfterViewInit  {

    @ViewChild("dogButton") dogButton: ElementRef;

    public allCats: CatInfos;
    private subscriptions: Array<Subscription> = [];

    public dogClickedObs: Subject<any> = new Subject<any>();

    constructor(private catInfoService: CatinfoService, private dogInfoService: DoginfoService, private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.catInfoService.getCatInfos().subscribe((kitties) => {
            this.allCats = kitties;
        });
        let clickSource = Observable.fromEvent(this.dogButton.nativeElement,'click');

        clickSource.switchMap(()=> {
            return this.calculatePiTo5000digits();
        }).subscribe(()=> {
            this.triggerDogEvent();
        });

        // counter example does not stop inner observable
        // clickSource.mergeMap(()=> {
        //     return this.calculatePiTo5000digits();
        // }).subscribe(()=> {
        //     this.triggerDogEvent();
        // });
    }

    ngAfterViewInit() {
        //console.log(`x `+this.dogClickedObs);
        this.dogClickedObs.debounceTime(300).subscribe((e)=> {
            console.log("subdoggy"+e);
        });
    }


    public triggerDogEvent() {
        this.dogInfoService.makeRandomDogEvent();
    }

    public showSubscribers() {
        let a = this.dogInfoService.getObserverCount();
        let c = this.catInfoService.getObserverCount();
        let msg = `Number of observers for dogs: ${a}\r\n`;
        msg += `Number of observers for cats ${c}`;
        this.toastr.warning(msg, 'Yo');
    }

    public calculatePiTo5000digits(): Observable<number> {
        return Observable.timer(1000).map(() => {
            return 3.145999999999999999;
        });
    }

}
