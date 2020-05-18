import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {ExploreComponent} from "./explore/explore.component";
import {ModalPostComponent} from "./shared/components/modal-post/modal-post.component";
import {PostResolver} from "./shared/post.resolver";
import {CommentsResolver} from "./shared/comments.resolver";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/explore', pathMatch: 'full'},
      {
        path: 'explore', component: ExploreComponent, children: [
          {
            path: 'p/:id',
            component: ModalPostComponent,
            resolve: {
              post: PostResolver,
              comments: CommentsResolver
            }
          }
        ]
      },
    ]
  },
  {path: '**', redirectTo: '/explore'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
