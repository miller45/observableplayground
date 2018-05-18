import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LivingroomComponent } from './livingroom/livingroom.component';


import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { HouseComponent } from "./house/house.component";
import { CatinfoService, CustomerService, DoginfoService, FodderService, GlobalOptionsService } from "./services";
import { ToastModule } from "ng2-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PantryComponent } from './pantry/pantry.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StickySubscriberComponent } from './spies/stickysubscriber/stickysubscriber.component';
import { IdGeneratorService } from "./services/idgenerator.service";
import { StickySubscriber2Component } from "./spies/stickysubscriber/stickysubscriber2.component";
import { LibModule } from "./lib.module";
import { EmailService } from "./services";
import { ExampleComponent } from "./bookexamples/example.component";
import { PersonService } from "./services/person.service";

@NgModule({
    declarations: [
        AppComponent,
        LivingroomComponent,
        HouseComponent,
        PantryComponent,
        StickySubscriberComponent,
        StickySubscriber2Component,
        ExampleComponent
    ],
    imports: [
        LibModule,
        ToastModule.forRoot(),
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [CatinfoService, DoginfoService, FodderService, IdGeneratorService, CustomerService, EmailService, PersonService, GlobalOptionsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
