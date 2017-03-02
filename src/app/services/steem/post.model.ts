import {Metadata} from "./metadata.model";
import {Author} from "./author.model";

export class Post {
  /**
   * Title of the post
   *
   * @type string
   */
  public title: string;

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
      throw new Error('Error while parsing Post json metadata');
    }

    if (postMetadata.image && postMetadata.image.length && postMetadata.image.length > 0) {
      post.imageUrls = postMetadata.image;
      post.body = post.body.replace(/<(?:.|\n)*?>/gm, '').substr(0, 50) + "...";
    }

    return post;
  }
}
