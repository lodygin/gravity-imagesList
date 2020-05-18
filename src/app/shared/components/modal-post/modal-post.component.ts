import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Comment, Post} from "../../interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent implements OnInit, OnDestroy {

  post: Post
  comments: Comment[]
  subPost: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open')
    this.subPost = this.route.data
      .subscribe(
        data => {
          this.post = data.post
          this.comments = data.comments.sort((a, b) => b.commentDate.getTime() - a.commentDate.getTime())
        }
    )
  }

  closeModal(event) {
    if (event.target.classList.contains('backdrop')) {
      this.router.navigate(['/explore'])
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open')
    this.subPost.unsubscribe()
  }
}
