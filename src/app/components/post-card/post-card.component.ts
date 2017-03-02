import {Component, Input} from '@angular/core';
import {Post} from "../../services/steem/post.model";

@Component({
  selector: 'ps-post-card',
  templateUrl: 'post-card.component.html',
  styleUrls: ['post-card.component.scss']
})
export class PostCardComponent {

  @Input() post: Post;

}
