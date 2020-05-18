import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Comment} from "./interfaces";
import {CommentsService} from "./services/comments.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class CommentsResolver implements Resolve<Comment[]>{

  constructor(
    private commentsService: CommentsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Comment[]> | Promise<Comment[]> | Comment[] {
    return this.commentsService.getAll(route.params['id'])
      .pipe(
        catchError(err => of([]))
      )
  }
}
