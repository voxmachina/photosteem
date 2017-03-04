import { Component } from '@angular/core';
import {MdDialog} from "@angular/material";
import {DialogComponent} from "./components/dialog/dialog.component";
import {ParametersService} from "./services/parameters/parameters.service";

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
   * @param parametersService
   */
  constructor(public dialog: MdDialog, private parametersService: ParametersService) { }

  /**
   * Opens a dialog
   *
   * @public
   * @returns void
   */
  public openSupportDialog(): void {
    this.parametersService.set('dialog-title', 'Donors Wanted!');
    this.parametersService.set('dialog-message', 'We need your support');
    this.parametersService.set('dialog-show-cancel', false);

    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log("done", result);
      this.parametersService.reset();
    });
  }
}
