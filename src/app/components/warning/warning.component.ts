import {Component, ElementRef} from '@angular/core';
import {GoogleAnalyticsService} from "../../services/analytics/google-analytics.service";

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
   * Tracks a click for the email
   *
   * @public
   * @returns void
   */
  public trackContactClick(): void {
    GoogleAnalyticsService.trackEvent('Contact', 'click', 'support');
  }

  /**
   * Tracks a click for the email
   *
   * @public
   * @returns void
   */
  public trackAboutClick(): void {
    GoogleAnalyticsService.trackEvent('About', 'click', 'support');
  }

  /**
   * Close this warning
   *
   * @returns void
   */
  close(): void {
    this.elementRef.nativeElement.querySelector('md-card').classList.add('hide');
  }
}
