import {Component, OnInit} from '@angular/core';
import {SteemService} from "../services/steem/steem.service";
import {Post} from "../services/steem/post.model";
import {Author} from "../services/steem/author.model";

@Component({
  selector: 'ps-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * A list of Posts
   *
   * @type Array<Post>
   */
  public posts: Array<Post>;

  /**
   * Current scroll position
   *
   * @type number
   */
  private scrollPosition: number;

  /**
   * Loading status
   *
   * @type boolean
   */
  public loadingMore: boolean = false;

  /**
   * @constructor
   * @param steemService
   */
  constructor(private steemService: SteemService) { }

  /**
   * Upon component initialization
   */
  ngOnInit() {
    this.scrollPosition = document.documentElement.scrollTop = document.body.scrollTop;
    this.steemService.getTrending(this.onPostsRequestResponse.bind(this));
  }

  /**
   * Loads more results
   *
   * @returns void
   */
  public loadMore(): void {
    if (this.loadingMore) return;

    this.loadingMore = true;
    this.steemService
      .nextPage()
      .getTrending(this.onPostsRequestResponse.bind(this));
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
    this.scrollPosition = document.documentElement.scrollTop = document.body.scrollTop;

    if (err) {
      console.error(err);
    } else {
      this.posts = res.map(Post.parsePost);
    }

    this.posts = this.posts.filter(post => post.imageUrls);
    this.posts.map(this.getAuthorDetails.bind(this));

    this.onPostsUpdate();
  }

  /**
   * When posts data is updated
   *
   * @private
   * @returns void
   */
  private onPostsUpdate(): void {
    this.loadingMore = false;
    setTimeout(() => document.documentElement.scrollTop = document.body.scrollTop = this.scrollPosition, 0);
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
