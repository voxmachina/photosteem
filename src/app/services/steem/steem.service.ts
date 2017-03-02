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
   * The current results page
   * Current API does not support pagination, so we'll have
   * to handle it on the client side by multiplying results
   *
   * @type number
   */
  private page: number = 1;

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

    console.log("limit", this.pageLimit * this.page);

    steem.api.getDiscussionsByTrending({path: this.tag, limit: this.pageLimit * this.page}, callback);
  }

  /**
   * Sets next page
   *
   * @public
   * @returns void
   */
  public nextPage(): void {
    this.page++;
  }

  /**
   * Gets an account details
   *
   * @public
   * @param username
   * @param callback
   * @returns void
   */
  public getAccountDetails(username, callback): void {
    steem.api.getAccounts([username], callback);
  }
}
