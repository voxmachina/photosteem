import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrendingComponent} from './trending.component';
import {TrendingRoutingModule} from "./trending.routing";
import {SharedModule} from "../shared/core.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TrendingRoutingModule
  ],
  declarations: [TrendingComponent]
})
export class TrendingModule { }
