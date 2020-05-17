import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent implements OnInit, OnDestroy {

  post: Post
  subPost: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subPost = this.route.data
      .subscribe(data => {
        this.post = data.post
      }
    )
  }

  closeModal(event) {
    if (event.target.classList.contains('backdrop')) {
      this.router.navigate(['/explore'])
    }
  }

  ngOnDestroy(): void {
    this.subPost.unsubscribe()
  }
}
