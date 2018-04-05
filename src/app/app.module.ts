import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {LivingroomComponent} from './livingroom/livingroom.component';


import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {HouseComponent} from "./house/house.component";
import {DoginfoService, CatinfoService} from "./services";
import {ToastModule, ToastOptions, ToastsManager} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        LivingroomComponent,
        HouseComponent
    ],
    imports: [
        ToastModule.forRoot(),
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpModule
    ],
    providers: [CatinfoService, DoginfoService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
