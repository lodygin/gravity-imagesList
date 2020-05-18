import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";
import {delay, switchMap} from "rxjs/operators";
import {CustomValidators} from "../../custom.validators";
import {CommentsService} from "../../services/comments.service";
import {Comment} from "../../interfaces"

@Component({
  selector: 'app-form-add-comment',
  templateUrl: './form-add-comment.component.html',
  styleUrls: ['./form-add-comment.component.scss']
})
export class FormAddCommentComponent implements OnInit {

  form: FormGroup
  loadFlag: boolean = false

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25)
      ], [
        CustomValidators.emptyField
      ]),
      comment: new FormControl('', [
        Validators.required,
        Validators.maxLength(200)
      ], [
        CustomValidators.emptyField
      ])
    })
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }

    this.loadFlag = true
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.commentsService.create(
            params['id'],
            {
              userName: this.form.value.userName.trim(),
              comment: this.form.value.comment.trim(),
              commentDate: new Date()
            })
        }),
        delay(100)
      )
      .subscribe((comment: Comment) => {
        this.commentsService.newComment$.next(comment)
        this.loadFlag = false
        this.form.reset()
      })

  }
}
