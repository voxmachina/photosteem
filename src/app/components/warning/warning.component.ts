import {Component, ElementRef} from '@angular/core';

declare const Hammer: any;

@Component({
  selector: 'ps-warning',
  templateUrl: 'warning.component.html',
  styleUrls: ['warning.component.scss']
})
export class WarningComponent {

  /**
   * @constructor
   * @public
   * @param elementRef
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * Close this warning
   *
   * @returns void
   */
  close(): void {
    this.elementRef.nativeElement.querySelector('md-card').classList.add('hide');
  }
}
