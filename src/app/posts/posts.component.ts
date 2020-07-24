import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../shared/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

}
