import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {CustomValidators} from "../../custom.validators";

@Component({
  selector: 'app-form-add-comment',
  templateUrl: './form-add-comment.component.html',
  styleUrls: ['./form-add-comment.component.scss']
})
export class FormAddCommentComponent implements OnInit {

  form: FormGroup

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
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

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.createComment(params['id'], this.form.value)
        })
      )
      .subscribe(res => {
        console.log(res)
      })

    this.form.reset()
  }
}
