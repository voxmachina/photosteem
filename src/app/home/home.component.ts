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
  public posts: Array<Post> = [];

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
    if (err) return;

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
