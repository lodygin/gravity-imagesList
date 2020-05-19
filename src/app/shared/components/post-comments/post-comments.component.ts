import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Comment} from "../../interfaces";
import {CommentsService} from "../../services/comments.service";
import {Subscription} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
  animations: [
    trigger('comment', [
      transition(':enter', [
        style(
          {transform: 'translateX(100%)'}
          ),
        animate('150ms ease-in-out', style(
          {transform: 'translateX(0%)'}
          )
        )
      ])
    ])
  ]
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
