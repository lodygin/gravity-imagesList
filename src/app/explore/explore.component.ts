import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../shared/interfaces";
import {PostsService} from "../shared/services/posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  subGetPosts: Subscription
  subNewPost: Subscription

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.subGetPosts = this.postsService.getAll().subscribe(posts => {
      posts.sort((a, b) => b.postDate.getTime() - a.postDate.getTime())
      this.posts = posts
      this.subGetPosts.unsubscribe()
    })

      this.postsService.newPost$.subscribe(post => {
        this.posts.unshift(post)
      })
  }

  ngOnDestroy(): void {
    this.subNewPost.unsubscribe()
  }

}
