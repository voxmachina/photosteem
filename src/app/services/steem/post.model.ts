import {Metadata} from "./metadata.model";
import {Author} from "./author.model";
import {Vote} from "./vote.model";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

declare const showdown: any;

export class Post {

  /**
   * Title of the post
   *
   * @type string
   */
  public title: string;

  public active_votes: Array<Vote>;

  public reblogged_by: any;

  /**
   * This post permlink
   *
   * @type string
   */
  public permlink: string;

  /**
   * The post URL
   *
   * @type string
   */
  public url: string;

  /**
   * Name of the author of the post
   *
   * @type Author
   */
  public author: Author;

  /**
   * Text content of the post
   *
   * @type string
   */
  public body: SafeHtml;

  /**
   * An array of the post images
   *
   * @type string
   */
  public imageUrls: Array<string>;

  public tags: Array<string>;

  public value: any;

  public pending_payout_value: string;

  /**
   * JSON string of the post metadata
   *
   * @type string
   */
  private json_metadata: string;

  /**
   * Parses a post metadata
   *
   * @public
   * @param post
   * @param sanitizer
   * @returns {Post}
   */
  public static parsePost(post: Post, sanitizer: DomSanitizer): Post {
    let postMetadata: Metadata;
    let converter = new showdown.Converter();

    try {
      postMetadata = JSON.parse(post.json_metadata);
    } catch(e) {
      console.warn('Error while parsing Post json metadata');
    }

    if (postMetadata && postMetadata.image && postMetadata.image.length && postMetadata.image.length > 0) {
      post.imageUrls = postMetadata.image;
      post.body = converter.makeHtml(post.body).substr(0, 100) + "...";
      post.body = ('' + post.body).replace(/<br>/gi, "\n");
      post.body = ('' + post.body).replace(/<p.*>/gi, "\n");
      post.body = ('' + post.body).replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
      post.body = ('' + post.body).replace(/<(?:.|\s)*?>/g, "");
      post.body = sanitizer.bypassSecurityTrustHtml('' + post.body);
    }

    if (post.pending_payout_value) {
      let valueTokens: Array<string> = post.pending_payout_value.split(" ");
      post.value = parseFloat(valueTokens[0]).toFixed(2);
    }

    if (postMetadata && postMetadata.tags && postMetadata.tags.length && postMetadata.tags.length > 0) {
      post.tags = postMetadata.tags;
    }

    return post;
  }
}
