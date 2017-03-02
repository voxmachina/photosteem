import {Component} from '@angular/core';
import {SteemService} from "../services/steem/steem.service";
import {Post} from "../services/steem/post.model";

@Component({
  selector: 'ps-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public posts: Array<Post>;

  /**
   * @constructor
   * @param steemService
   */
  constructor(private steemService: SteemService) {
    steemService.getTrending(this.onPostsRequestResponse.bind(this));
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

    console.log(this.posts[0]);
  }
}
