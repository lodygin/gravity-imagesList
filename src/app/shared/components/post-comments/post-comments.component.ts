import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Comment} from "../../interfaces";
import {CommentsService} from "../../services/comments.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit, OnDestroy {

  @Input() comments: Comment[] = []
  subNewComment: Subscription

  constructor(
    private commentsService: CommentsService
  ) {
  }

  ngOnInit(): void {
    this.subNewComment = this.commentsService.newComment$
      .subscribe((comment: Comment) => {
        this.comments.unshift(comment)
      })
  }

  ngOnDestroy(): void {
    this.subNewComment.unsubscribe()
  }

}
