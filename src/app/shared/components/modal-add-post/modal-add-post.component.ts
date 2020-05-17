import {Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../interfaces";
import {Observable, Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-modal-add-img',
  templateUrl: './modal-add-post.component.html',
  styleUrls: ['./modal-add-post.component.scss']
})
export class ModalAddPostComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter<void>()

  form: FormGroup
  linkError: boolean = false
  loadFlag: boolean = false
  subCheckImage: Subscription

  constructor(
    private postsService: PostsService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open')
    this.form = new FormGroup({
      link: new FormControl(null, [Validators.required])
    })
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }
    this.loadFlag = true
    const link = this.form.value.link.trim()
    this.subCheckImage = this.checkImage(link)
      .pipe(
        delay(200)
      )
      .subscribe(
        () => {
          const post: Post = {
            link: link,
            postDate: new Date()
          }

          this.postsService.create(post).subscribe(() => {
            this.loadFlag = false
            return this.close.emit()
          })
        },
        () => {
          this.linkError = true
          this.loadFlag = false
        }
      )
  }

  checkImage(url) {
    return new Observable(observer => {
      const img = new Image()
      img.src = url

      img.onload = () => {
        observer.next()
      }
      img.onerror = () => {
        observer.error()
      }
    })
  }

  changeErrorFlag() {
    if (this.linkError) {
      this.linkError = false
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open')
    this.subCheckImage.unsubscribe()
  }
}

