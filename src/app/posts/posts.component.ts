import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
  }

}
