import { Injectable } from '@angular/core';

declare const ga:any;

@Injectable()
export class GoogleAnalyticsService {

  /**
   * Tracks an event
   *
   * @public
   * @param category
   * @param action
   * @param value
   */
  public static trackEvent(category: string, action: string, value: string = ''): void {
    ga('send', 'event', category, action, value);
  }
}
