import {Component} from '@angular/core';
import {ParametersService} from "../../services/parameters/parameters.service";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'ps-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent {

  /**
   * A title
   *
   * @type string
   */
  public title: string;

  /**
   * A message
   *
   * @type string
   */
  public message: string;

  /**
   * A flag to indicate if to show ok button
   *
   * @type string
   */
  public showOk: boolean = true;

  /**
   * A flag to indicate if to show cancel button
   *
   * @type string
   */
  public showCancel: boolean = false;

  /**
   * @constructor
   * @public
   * @param dialogRef
   * @param parametersService
   */
  constructor(public dialogRef: MdDialogRef<DialogComponent>, private parametersService: ParametersService) {
    this.title = this.parametersService.get('dialog-title');
    this.message = this.parametersService.get('dialog-message');
    this.showCancel = this.parametersService.get('dialog-show-cancel');
  }
}
