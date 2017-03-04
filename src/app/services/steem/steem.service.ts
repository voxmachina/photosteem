import { Injectable } from '@angular/core';
import {Callback} from "./callback.interface";
import {Author} from "./author.model";

declare const steem: any;
declare const steemconnect: any;

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
    steem.api.getDiscussionsByTrending({tag: this.tag, limit: this.pageLimit * this.page}, callback);
  }

  /**
   * Performs a vote action
   *
   * @public
   * @param voter
   * @param author
   * @param permlink
   * @param value
   * @param callback
   */
  public vote(voter: Author, author: Author, permlink: string, value: number, callback: Callback) {
    steemconnect.vote(voter.name, author.name, permlink, value, callback);
  }

  /**
   * Resteems a post
   *
   * @public
   * @param user
   * @param author
   * @param permlink
   * @param callback
   */
  public reblog(user: Author, author: Author, permlink: string, callback: Callback) {
    steemconnect.reblog(user.name, author.name, permlink, callback);
  }

  /**
   * Sets next page
   *
   * @public
   * @returns SteemService
   */
  public nextPage(): SteemService {
    this.page++;

    return this;
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
