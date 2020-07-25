import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { FormComponent } from './form/form.component';
import { PostsComponent } from './posts/posts.component';
import { CutTextPipe } from './shared/cut-text.pipe';
import { PostInterceptor } from './shared/post.interceptor';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: PostInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    FormComponent,
    PostsComponent,
    CutTextPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
