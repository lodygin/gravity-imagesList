import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../interfaces";
import {CommentsService} from "../../services/comments.service";

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {

  @Input() comments: Comment[] = []

  constructor(
    private commentsService: CommentsService
  ) {
  }

  ngOnInit(): void {
    this.commentsService.newComment$
      .subscribe((comment: Comment) => {
        this.comments.unshift(comment)
      })
  }

}
