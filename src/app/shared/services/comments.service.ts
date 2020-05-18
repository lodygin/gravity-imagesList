import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Comment, FbCreateResponse} from "../interfaces";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  newComment$ = new Subject<Comment>()

  constructor(
    private http: HttpClient
  ) {
  }

  create(postId: string, comment: Comment): Observable<Comment> {
    return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/postsComments/${postId}/.json`, comment)
      .pipe(
        map((response: FbCreateResponse) => {

          return {
            ...comment,
            commentDate: new Date(comment.commentDate),
            id: response.name
          }
        })
      )
  }

  getAll(postId: string): Observable<any> {
    return this.http.get(`${environment.fbDbUrl}/postsComments/${postId}/.json`)
      .pipe(
        map((response: object) => {
          return Object.keys(response)
            .map(id => {
              return {
                ...response[id],
                id,
                commentDate: new Date(response[id].commentDate)
              }
            })
        })
      )
  }

}
