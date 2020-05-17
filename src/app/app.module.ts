import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {AppComponent} from './app.component';
import {ExploreComponent} from './explore/explore.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ModalPostComponent} from './shared/components/modal-post/modal-post.component';
import {RefDirective} from "./shared/ref.directive";
import {ModalAddPostComponent} from "./shared/components/modal-add-post/modal-add-post.component";
import { AlertComponent } from './shared/components/alert/alert.component';
import {HttpClientModule} from "@angular/common/http";
import { FormAddCommentComponent } from './shared/components/form-add-comment/form-add-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ExploreComponent,
    ModalPostComponent,
    FooterComponent,
    HeaderComponent,
    RefDirective,
    ModalAddPostComponent,
    AlertComponent,
    FormAddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
