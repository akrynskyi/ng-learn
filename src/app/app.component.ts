import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface UserModel {
  name: string,
  email: string,
  password: string,
  meal: string,
  question: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  meals = ['borsch', 'varenyky', 'holubtsi'];
  user: UserModel = {
    name: 'New user',
    email: 'user@mail.com',
    password: 'qwerty',
    meal: 'borsch',
    question: 'yes'
  };
  selected = null;
  submitted = false;

  constructor() { }

  onSubmit(loginForm: NgForm) {
    this.submitted = true;
    this.user = loginForm.value as UserModel;
    loginForm.reset();
  }
}
