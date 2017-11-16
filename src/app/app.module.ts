import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LivingroomComponent } from './livingroom/livingroom.component';
import { BathroomComponent } from './bathroom/bathroom.component';
import { CatinfoService } from "./catinfo.service";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

@NgModule({
    declarations: [
        AppComponent,
        LivingroomComponent,
        BathroomComponent
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
