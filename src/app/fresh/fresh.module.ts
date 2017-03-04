import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FreshComponent} from './fresh.component';
import {FreshRoutingModule} from "./fresh.routing";
import {SharedModule} from "../shared/core.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FreshRoutingModule
  ],
  declarations: [FreshComponent]
})
export class FreshModule { }
