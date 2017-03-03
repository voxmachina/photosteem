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

  /**
   * The post
   *
   * @type Post
   */
  @Input() post: Post;

  /**
   * @constructor
   * @public
   * @param dialog
   */
  constructor(public dialog: MdDialog) { }

  /**
   * Opens a dialog
   *
   * @public
   * @returns void
   */
  public openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log("done", result);
    });
  }
}
