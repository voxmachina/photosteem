import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Post} from "../../services/steem/post.model";
import {MdDialog} from "@angular/material";
import {DialogComponent} from "../dialog/dialog.component";
import {SteemService} from "../../services/steem/steem.service";
import {Author} from "../../services/steem/author.model";
import {ParametersService} from "../../services/parameters/parameters.service";
import {AuthService} from "../../services/auth/auth.service";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'ps-post-card',
  templateUrl: 'post-card.component.html',
  styleUrls: ['post-card.component.scss']
})
export class PostCardComponent implements OnChanges {

  /**
   * The post
   *
   * @type Post
   */
  @Input() post: Post;

  /**
   * The current user/viewer
   *
   * @type string
   */
  @Input() viewer: Author;

  /**
   * Indicates if current viewer has voted on this post
   *
   * @type boolean
   */
  public voted: boolean = false;

  /**
   * Indicates if current viewer has reblogged this post
   *
   * @type boolean
   */
  public reblogged: boolean = false;

  /**
   * Indicates if this post is being reblogged
   *
   * @type boolean
   */
  public reblogging: boolean = false;

  /**
   * Indicates if this post is being voted
   *
   * @type boolean
   */
  public voting: boolean = false;

  /**
   * The max value to vote
   *
   * @type number
   */
  private voteMax: number = 10000;

  /**
   * The min value to vote
   *
   * @type number
   */
  private voteMin: number = -10000;

  /**
   * @constructor
   * @public
   * @param dialog
   * @param authService
   * @param steemService
   * @param parametersService
   * @param alertService
   */
  constructor(
    public dialog: MdDialog,
    private authService: AuthService,
    private steemService: SteemService,
    private parametersService: ParametersService,
    private alertService: AlertService
  ) { }

  /**
   * On changes event from this component Inputs
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['viewer'] && changes['viewer'].currentValue) {
      for (let vote of this.post.active_votes) {
        if (vote.voter === changes['viewer'].currentValue.name) {
          this.voted = true;
          break;
        }
      }
    }
  }

  /**
   * Reblog this post
   *
   * @public
   * @param author
   * @param permlink
   * @returns void
   */
  public reblog(author, permlink): void {
    this.reblogging = true;

    if (!this.viewer) {
      window.location.href = this.authService.getLoginUrl();
      return;
    }

    if (!this.reblogged) {
      this.steemService.reblog(this.viewer, author, permlink, this.onReblogResponse.bind(this));
    }
  }

  /**
   * On reblog action response
   *
   * @private
   * @param err
   * @param res
   * @returns void
   */
  private onReblogResponse(err, res): void {
    this.reblogging = false;

    if (err) {
      this.reblogged = true;
      this.alertService.display('Already reblogged before!');
    } else {
      this.reblogged = true;
      this.alertService.display('Reblogged!');
    }
  }

  /**
   * Vote
   *
   * @public
   * @param author
   * @param permlink
   * @returns void
   */
  public vote(author, permlink): void {
    this.voting = true;

    if (!this.viewer) {
      window.location.href = this.authService.getLoginUrl();
      return;
    }

    if (!this.voted) {
      this.steemService.vote(this.viewer, author, permlink, this.voteMax, this.onVoteUpResponse.bind(this));
    } else {
      this.openVoteDownDialog(author, permlink);
    }
  }

  /**
   * On downvote action response
   *
   * @private
   * @param err
   * @param res
   * @returns void
   */
  private onVoteDownResponse(err, res): void {
    this.voting = false;

    if (err) {
      console.warn(err);
      this.alertService.display('There was an error, please try again later');
    } else {
      this.voted = false;
      this.alertService.display('Voted!');
    }
  }

  /**
   * On upvote action response
   *
   * @private
   * @param err
   * @param res
   * @returns void
   */
  private onVoteUpResponse(err, res): void {
    this.voting = false;

    if (err) {
      console.warn(err);
      this.alertService.display('There was an error, please try again later!');
    } else {
      this.voted = true;
      this.alertService.display('Voted!');
    }
  }

  /**
   * Opens a dialog
   *
   * @public
   * @returns void
   */
  public openVoteDownDialog(author, permlink): void {
    this.parametersService.set('dialog-title', 'Careful');
    this.parametersService.set('dialog-message', 'Do you really want to remove your vote?');
    this.parametersService.set('dialog-show-cancel', true);

    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.parametersService.reset();

      if (result) {
        this.steemService.vote(this.viewer, author, permlink, this.voteMin, this.onVoteDownResponse.bind(this));
      } else {
        this.voting = false;
      }
    });
  }

  /**
   * Opens a dialog
   *
   * @public
   * @returns void
   */
  public openDialog(): void {
    this.parametersService.set('dialog-message', 'Coming soon!');

    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("done", result);
    });
  }
}
