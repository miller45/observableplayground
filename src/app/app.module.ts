import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {LivingroomComponent} from './livingroom/livingroom.component';


import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {HouseComponent} from "./house/house.component";
import {DoginfoService, CatinfoService} from "./services";

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
    providers: [CatinfoService, DoginfoService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
