import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { PostService, Post } from '../shared/post.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  imageFieldActive = false;

  constructor(
    private postService: PostService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      image: [null],
      tags: this.fb.array([])
    });
  }

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  addTag() {
    this.tags.push(this.fb.control(null, Validators.required));
  }

  onSubmit() {
    const post = this.form.value as Post;
    this.postService
      .writePost(post)
      .subscribe(() => this.postService.getPosts());
    this.form.reset();
    this.tags.clear();
    this.imageFieldActive = false;
  }

}
