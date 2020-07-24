import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PostService, Post } from '../shared/post.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  submitted = false;
  imageFieldActive = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      image: new FormControl(null),
      tags: new FormArray([])
    });
  }

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  addTag() {
    this.tags.push(new FormControl(null, Validators.required));
  }

  onSubmit() {
    this.postService.writePost(this.form.value as Post);
    this.submitted = true;
    this.form.reset();
    this.tags.clear();
  }
}
