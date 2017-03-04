import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {RouterModule} from "@angular/router";

import {HeaderComponent} from "../components/header/header.component";
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {LazyLoadImageModule} from 'ng2-lazyload-image';
import {SteemService} from "../services/steem/steem.service";
import {PostCardComponent} from "../components/post-card/post-card.component";
import {LoaderComponent} from "../components/loader/loader.component";
import {DialogComponent} from "../components/dialog/dialog.component";

import 'hammerjs';
import {AuthService} from "../services/auth/auth.service";
import {ParametersService} from "../services/parameters/parameters.service";
import {SlideshowComponent} from "../components/slideshow/slideshow.component";
import {GoogleAnalyticsService} from "../services/analytics/google-analytics.service";
import {AlertService} from "../services/alert/alert.service";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    PostCardComponent,
    LoaderComponent,
    DialogComponent,
    SlideshowComponent
  ],
  providers: [
    SteemService,
    AuthService,
    ParametersService,
    GoogleAnalyticsService,
    AlertService
  ],
  entryComponents: [DialogComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoaderComponent,
    LazyLoadImageModule,
    HeaderComponent,
    DialogComponent,
    InfiniteScrollModule,
    PostCardComponent,
    SlideshowComponent
  ]
})
export class SharedModule { }
