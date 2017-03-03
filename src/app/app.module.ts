import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app.routing";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
