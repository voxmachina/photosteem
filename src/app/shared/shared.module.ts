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
  declarations: [HeaderComponent, PostCardComponent, LoaderComponent, DialogComponent],
  providers: [SteemService],
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
    PostCardComponent
  ]
})
export class SharedModule { }
