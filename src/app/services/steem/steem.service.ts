import { Injectable } from '@angular/core';
import {Callback} from "./callback.interface";

declare const steem: any;

@Injectable()
export class SteemService {

  /**
   * The default page limit
   *
   * @type number
   */
  private pageLimit: number = 10;

  /**
   * Service base category
   *
   * @type string
   */
  private tag: string = 'photography';

  /**
   * Gets a list of the trending posts
   *
   * @public
   * @param callback
   * @returns void
   */
  public getTrending(callback: Callback): void {
    steem.api.getDiscussionsByTrending({tag: this.tag, limit: this.pageLimit}, callback);
  }
}
