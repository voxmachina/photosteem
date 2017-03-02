import {Metadata} from "./metadata.model";

export class Post {
  title: string;
  author: string;
  body: string;
  json_metadata: string;
  imageUrls: Array<string>;

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

    post.imageUrls = postMetadata.image;
    post.body = post.body.replace(/<(?:.|\n)*?>/gm, '').substr(0, 15) + "...";

    return post;
  }
}
