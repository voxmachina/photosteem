import {Metadata} from "./metadata.model";
import {Author} from "./author.model";
import {Vote} from "./vote.model";

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
  public body: string;

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
   * @returns Post
   */
  public static parsePost(post: Post): Post {
    let postMetadata: Metadata;

    try {
      postMetadata = JSON.parse(post.json_metadata);
    } catch(e) {
      console.warn('Error while parsing Post json metadata');
    }

    if (postMetadata && postMetadata.image && postMetadata.image.length && postMetadata.image.length > 0) {
      post.imageUrls = postMetadata.image;
      post.body = post.body.replace(/<(?:.|\n)*?>/gm, '').substr(0, 50) + "...";
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
