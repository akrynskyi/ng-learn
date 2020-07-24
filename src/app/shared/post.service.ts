import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  writePost(post: Post) {
    this.http.post<Post>('https://ng-lrn.firebaseio.com/posts.json', post).subscribe();
  }

  getPosts(): Observable<Post[]> {
    return this.http.get('https://ng-lrn.firebaseio.com/posts.json')
      .pipe(map(value => Object.keys(value).map(key => ({...value[key], id: key}))));
  }
}
