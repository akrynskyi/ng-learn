import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

interface UserModel {
  name: string,
  email: string,
  password: string,
  extra: {
    meal: string,
    countries?: Array<string>
    question: string
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  user: UserModel = {
    name: 'New user',
    email: 'user@mail.com',
    password: 'qwerty',
    extra: {
      meal: 'borsch',
      countries: [],
      question: 'yes'
    }
  };

  meals = [
    'borsch',
    'varenyky',
    'holubtsi'
  ];
  names = [
    'Mykola',
    'Yaryk',
    'Alina',
    'Anton',
    'Lena'
  ];
  namesAsync = [
    'Test',
    'Noname',
    'Nickname',
    'Hello',
    'World'
  ];
  emails = [
    'test@mail.com',
    'mymail@mail.com',
    'hi@mail.com',
    'another@mail.com',
    'reallyemail@mail.com'
  ];

  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(
        null,
        {
          validators: [Validators.required, this.forbiddenNames(this.names).bind(this)],
          asyncValidators: this.forbiddenNamesAsync(this.namesAsync).bind(this),
          updateOn: 'blur'
        }
      ),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ], this.isEmailUnique(this.emails).bind(this)),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      extra: new FormGroup({
        meal: new FormControl(null, Validators.required),
        countries: new FormArray([]),
        question: new FormControl(null)
      })
    });
  }

  get countries() {
    return this.form.get('extra.countries') as FormArray;
  }

  addCountry() {
    this.countries.push(new FormControl(null, Validators.required));
  }

  forbiddenNames(names: Array<string>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: { name: string} } | null => {
      return names.includes(control.value) ? { 'forbiddenName': { name: control.value } } : null;
    }
  }

  // async validator using new Observable()
  isEmailUnique(emails: Array<string>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const includes = emails.includes(control.value);
      return new Observable(obs => {
        obs.next(includes);
        obs.complete();
      })
      .pipe(
        delay(2000),
        map(val => val ? { 'uniqueEmail': { error: `Email address ${control.value} is already taken`} } : null)
      )
    }
  }

  // async validator using of() function
  forbiddenNamesAsync(names: Array<string>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(names.includes(control.value))
        .pipe(
          delay(2000),
          map(val => val ? { 'forbiddenName': { name: control.value } } : null)
        )
    }
  }

  onSubmit() {
    this.submitted = true;
    this.user = this.form.value as UserModel;
    this.form.reset();
    this.countries.clear();
  }
}
