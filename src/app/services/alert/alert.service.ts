import { Injectable } from '@angular/core';
import {MdSnackBar} from "@angular/material";

@Injectable()
export class AlertService {

  /**
   * @constructor
   * @public
   * @param snackBar
   */
  constructor(private snackBar: MdSnackBar) { }

  /**
   * Displays an alert
   *
   * @public
   * @param msg
   * @param action
   * @returns void
   */
  public display(msg: string, action: string = null): void {
    this.snackBar.open(msg, action, {
      duration: 3000,
      extraClasses: ['alert-container']
    });
  }
}
