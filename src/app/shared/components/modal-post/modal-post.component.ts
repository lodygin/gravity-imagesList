import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Comment, Post} from "../../interfaces";
import {Subscription, timer} from "rxjs";
import {backdrop, modalWindow} from "../../modal-window.animation";

@Component({
  selector: 'modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss'],
  animations: [backdrop, modalWindow]
})
export class ModalPostComponent implements OnInit, OnDestroy {
  isShowComponent: boolean = true

  post: Post
  comments: Comment[]
  subPost: Subscription
  subTimer: Subscription

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

  closeModal() {
    this.isShowComponent = false
    this.subTimer = timer(250).subscribe(() => {
      this.router.navigate(['/explore'])
    })

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open')
    this.subPost.unsubscribe()
    this.subTimer.unsubscribe()
  }
}
