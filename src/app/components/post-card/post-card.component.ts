import {Component, Input} from '@angular/core';
import {Post} from "../../services/steem/post.model";
import {MdDialog} from "@angular/material";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'ps-post-card',
  templateUrl: 'post-card.component.html',
  styleUrls: ['post-card.component.scss']
})
export class PostCardComponent {

  @Input() post: Post;

  constructor(public dialog: MdDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log("done");
    });
  }
}
