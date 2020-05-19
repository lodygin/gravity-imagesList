import {Component, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
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
  width: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.renderer.addClass(document.body, 'modal-open')
    this.route.data
      .subscribe(
        data => {
          this.post = data.post
          this.comments = data.comments.sort((a, b) => b.commentDate.getTime() - a.commentDate.getTime())
        }
      )
  }

  closeModal() {
    this.isShowComponent = false
    timer(250).subscribe(() => {
      this.router.navigate(['/explore'])
    })

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open')
  }
}
