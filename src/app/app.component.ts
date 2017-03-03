import { Component } from '@angular/core';
import {MdDialog} from "@angular/material";
import {DialogComponent} from "./components/dialog/dialog.component";

@Component({
  selector: 'ps-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

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
