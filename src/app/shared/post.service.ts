import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface Post {
  id?: string,
  title: string,
  text: string,
  image?: string,
  tags?: Array<string>,
  date?: Date
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts$: Observable<Post[]>;

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    console.error(error.error.error);
    return throwError('Something goes wrong try to fresh page...');
  }

  writePost(post: Post): Observable<Post> {
    return this.http.post<Post>('https://ng-lrn.firebaseio.com/posts.json', post)
      .pipe(catchError(this.handleError));
  }

  getPosts() {
    this.posts$ = this.http.get<{[key: string]: Post}>('https://ng-lrn.firebaseio.com/posts.json')
      .pipe(
        map(obj => {
          if (!obj) return [];
          return Object.keys(obj).map(key => ({...obj[key], id: key}))
        }),
        catchError(this.handleError)
      );
  }

  deletePosts() {
    this.http.delete('https://ng-lrn.firebaseio.com/posts.json')
      .pipe(catchError(this.handleError))
      .subscribe(() => this.getPosts());
  }
}
