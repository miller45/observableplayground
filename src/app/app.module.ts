import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {LivingroomComponent} from './livingroom/livingroom.component';

import {CatinfoService} from "./catinfo.service";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {HouseComponent} from "./bathroom/house.component";

@NgModule({
    declarations: [
        AppComponent,
        LivingroomComponent,
        HouseComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule
    ],
    providers: [CatinfoService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
