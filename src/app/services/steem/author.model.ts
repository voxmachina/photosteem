import {Metadata} from "./metadata.model";

export class Author {
  /**
   * Title of the post
   *
   * @type string
   */
  public name: string;

  /**
   * This author avatar url
   */
  public avatar: string;


  /**
   * JSON string of the post metadata
   *
   * @type string
   */
  private json_metadata: string;

  /**
   * Parses a post metadata
   *
   * @param author
   * @returns {Author}
   */
  public static parseAuthor(author: Author): Author {
    let postMetadata: Metadata;

    try {
      postMetadata = JSON.parse(author.json_metadata);
    } catch(e) {
      throw new Error('Error while parsing Post json metadata');
    }

    if (postMetadata.profile && postMetadata.profile.profile_image) {
      author.avatar = postMetadata.profile.profile_image;
    }

    return author;
  }
}
