import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {LivingroomComponent} from './livingroom/livingroom.component';


import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {HouseComponent} from "./house/house.component";
import {DoginfoService, CatinfoService, FodderService} from "./services";
import {ToastModule} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PantryComponent} from './pantry/pantry/pantry.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        LivingroomComponent,
        HouseComponent,
        PantryComponent
    ],
    imports: [
        ToastModule.forRoot(),
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [CatinfoService, DoginfoService, FodderService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
