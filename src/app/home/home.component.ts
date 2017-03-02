import {Component} from '@angular/core';
import {SteemService} from "../services/steem/steem.service";
import {Post} from "../services/steem/post.model";
import {Author} from "../services/steem/author.model";

@Component({
  selector: 'ps-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  /**
   * A list of Posts
   *
   * @type Array<Post>
   */
  public posts: Array<Post>;

  private page: number = 0;

  private pages: Array<any> = [];

  /**
   * The current results page
   * Current API does not support pagination, so we'll have
   * to handle it on the client side by multiplying results and keeping
   * a offset pointer
   *
   * @type number
   */
  private offset: number = 0;

  /**
   * @constructor
   * @param steemService
   */
  constructor(private steemService: SteemService) {
    this.steemService.getTrending(this.onPostsRequestResponse.bind(this));
  }

  /**
   * Loads more results
   *
   * @returns void
   */
  public loadMore(): void {
    this.steemService.nextPage();
    this.steemService.getTrending(this.onPostsRequestResponse.bind(this));
  }

  /**
   * On posts requests response
   *
   * @private
   * @param err
   * @param res
   * @returns void
   */
  private onPostsRequestResponse(err: any, res: Array<Post>): void {
    if (err) {
      console.error(err);
    } else {
      this.posts = res.map(Post.parsePost);
    }

    this.posts = this.posts.filter(post => post.imageUrls);



    this.pages[this.page] = this.posts.splice(this.offset);
    this.page++;
    this.offset = this.posts.length;


    console.log("offset", this.pages);

    this.posts.map(this.getAuthorDetails.bind(this))
  }

  /**
   * Get a post author details
   *
   * @private
   * @param post
   * @returns void
   */
  private getAuthorDetails(post: Post): void {
    this.steemService.getAccountDetails(
      post.author,
      (err, res) => this.onAuthorRequestResponse(err, res, post)
    )
  }

  /**
   * On author details request response
   *
   * @private
   * @param err
   * @param author
   * @param post
   * @returns void
   */
  private onAuthorRequestResponse(err: any, author: any, post: Post): void {
    if (err) {
      console.log(err);
    } else {
      post.author = Author.parseAuthor(author[0]);
    }
  }
}
