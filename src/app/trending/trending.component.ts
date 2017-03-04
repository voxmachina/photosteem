import {Component, OnInit} from '@angular/core';
import {SteemService} from "../services/steem/steem.service";
import {Post} from "../services/steem/post.model";
import {Author} from "../services/steem/author.model";
import {AuthService} from "../services/auth/auth.service";
import {AlertService} from "../services/alert/alert.service";

@Component({
  selector: 'ps-trending',
  templateUrl: 'trending.component.html',
  styleUrls: ['trending.component.scss']
})
export class TrendingComponent implements OnInit {

  /**
   * Current viewer
   *
   * @type Author
   */
  public viewer: Author;

  /**
   * A list of Posts
   *
   * @type Array<Post>
   */
  public posts: Array<Post> = [];

  /**
   * Loading status
   *
   * @type boolean
   */
  public loadingMore: boolean = false;

  /**
   * Tracks if current user/viewer is authenticated
   *
   * @type boolean
   */
  private isUserAuthenticated: boolean = false;

  /**
   * @constructor
   * @param steemService
   * @param authService
   * @param alertService
   */
  constructor(
    private steemService: SteemService,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  /**
   * Upon component initialization
   */
  ngOnInit() {
    this.authService.authenticate((err, res) => this.onAuthenticationResponse(err, res));
    this.steemService.getTrending(this.onPostsRequestResponse.bind(this));
  }

  /**
   * Loads more results
   *
   * @public
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
   * On authentication response
   *
   * @private
   * @param err
   * @param res
   * @returns void
   */
  private onAuthenticationResponse(err, res: any): void {
    this.isUserAuthenticated = !err && res.isAuthenticated;

    if (this.isUserAuthenticated) {
      this.steemService.getAccountDetails(res.username, this.onAccountResponse.bind(this));
    }
  }

  /**
   * On Account response
   *
   * @private
   * @param err
   * @param res
   * @returns void
   */
  private onAccountResponse(err, res: Author): void {
    if (err) {
      this.alertService.display('There was an error, please try again later!');
    } else {
      this.viewer = Author.parseAuthor(res[0]);
    }
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
      this.loadingMore = false;
      return;
    }

    let previousLength = this.posts ? this.posts.length : 0;

    let posts = res.splice(previousLength)
      .map(Post.parsePost)
      .filter(post => post.imageUrls);

    this.updatePosts(posts);
    this.updateAuthors(posts);
  }

  /**
   * Updates the list of posts
   *
   * @private
   * @param posts
   * @returns void
   */
  private updatePosts(posts: Array<Post>): void {
    this.posts = this.posts.concat(posts);
    this.loadingMore = false;
  }

  /**
   * Updates asynchronously current list of posts author's info
   *
   * @private
   * @param posts
   * @returns void
   */
  private updateAuthors(posts: Array<Post>): void {
    setTimeout(() => posts.map(this.getAuthorDetails.bind(this)), 100);
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
