import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

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
    if (environment.production) {
      ga('send', 'event', category, action, value);
    } else {
      console.info("tracking event: ", category, action, value);
    }
  }

  /**
   * Tracks a view
   *
   * @public
   * @param page
   * @returns void
   */
  public static trackView(page: string): void {
    if (environment.production) {
      ga('send', 'pageview', page);
    } else {
      console.info("tracking view: ", page);
    }
  }
}
