import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {FodderService} from "./fodder.service";
import {PantryComponent} from "../pantry/pantry/pantry.component";
import {BaseRequestOptions, ConnectionBackend, Http} from "@angular/http";
import {MockHttpModule} from "../../mock-http/mock-http.module";
import {MockBackend} from "@angular/http/testing";
import {Observable} from "rxjs";


export function mockHttpFactory() {
    return {
        get: () => {
            return Observable.of<any>({});
        }
    };
}


xdescribe('FodderService', () => {


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [FodderService, {
                provide: Http,
                useFactory: mockHttpFactory
            }]
        });
    }));

    beforeEach(() => {

    });

    it('should be injectable', inject([FodderService], (fodderService: FodderService) => {
        expect(fodderService).toBeDefined();
    }));

    it('should deliver fodder kinds', (done)=> inject([FodderService], (fodderService: FodderService) => {
        expect(fodderService).toBeDefined();
        let kinds = fodderService.getFooderKinds();
        kinds.subscribe((d)=> {
            expect(d).toBeDefined();
            done();
        });
    }));
});
