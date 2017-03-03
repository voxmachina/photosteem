import {Component} from '@angular/core';
import {DialogComponent} from "../dialog/dialog.component";
import {MdDialog} from "@angular/material";

@Component({
  selector: 'ps-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

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
