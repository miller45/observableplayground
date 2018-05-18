import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CatinfoService, DoginfoService } from "../services";
import { CatInfo, CatInfos, DogEventKind } from "../models";
import { ToastsManager } from "ng2-toastr";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import { Subject } from "rxjs/Subject";
import { Person } from "../models/person";
import { PersonService } from "../services/person.service";


@Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HouseComponent implements OnInit, AfterViewInit {

    @ViewChild("dogButton") dogButton: ElementRef;

    public allCats: CatInfos;

    public dogCount: number = 0;

    private subscriptions: Array<Subscription> = [];

    public dogClickedObs: Subject<any> = new Subject<any>();

    constructor(private catInfoService: CatinfoService, private dogInfoService: DoginfoService, private toastr: ToastsManager, private personService: PersonService) {
    }

    ngOnInit() {
        this.catInfoService.getCatInfos().subscribe((kitties) => {
            this.allCats = kitties;
        });

        this.dogInfoService.dogEvents.subscribe((event) => {
            switch (event.kind) {
                case DogEventKind.DogArrives:
                    this.increaseDogCount();
                    break;
                case DogEventKind.DogLeaves:
                    this.decreaseDogCount();
                    break;
                //we dont care about other event kinds
            }
        });

        let clickSource = Observable.fromEvent(this.dogButton.nativeElement, 'click');

        clickSource.switchMap(() => {
            return this.calculatePiTo5000digits();
        }).subscribe((pi) => {
            console.log(`calculated pi: ${pi}`);
            this.triggerDogEvent();
        });

        // counter example does not stop inner observable
        // clickSource.mergeMap(()=> {
        //     return this.calculatePiTo5000digits();
        // }).subscribe(()=> {
        //     this.triggerDogEvent();
        // });

        // for observable demo
        if (this.allCats && this.allCats.length > 0) {
            let strayCat: CatInfo = this.allCats[0];
            this.catInfoService.seekOwner(strayCat).switchMap(
                (person: Person) => {
                    return this.personService.getPersonAddress(person);
                });

        }


    }

    ngAfterViewInit() {
        //console.log(`x `+this.dogClickedObs);
        this.dogClickedObs.debounceTime(300).subscribe((e) => {
            console.log("subdoggy" + e);
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
        return Observable.timer(300).map(() => {
            return 3.14159265;
        });
    }

    private increaseDogCount() {
        this.dogCount++;
    }

    private decreaseDogCount() {
        this.dogCount--;
    }

}
