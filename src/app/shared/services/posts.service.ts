import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FbCreateResponse, Post} from "../interfaces";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  newPost$ = new Subject<Post>()

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {

          const newPost = {
            ...post,
            id: response.name,
            datePost: new Date(post.postDate)
          }

          this.newPost$.next(newPost)

          return newPost
        })
      )
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: object) => {
          return Object.keys(response)
            .map(id => {
              return {
                ...response[id],
                id,
                postDate: new Date(response[id].postDate)
              }
            })
        })
      )
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.postDate)
          }
        })
      )
  }

}
