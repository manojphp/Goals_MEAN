import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-signup',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <input
        placeholder="email"
        formControlName="email"
        class="input is-normal m-2"
      />
      <input
        placeholder="fullname"
        formControlName="fullname"
        class="input is-normal m-2"
      />
      <input
        placeholder="password"
        formControlName="password"
        class="input is-normal m-2"
        type="password"
      />

      <button type="submit" class="button is-fullwidth is-success m-2">
        Submit
      </button>
    </form>
  `,
})
export class SignupComponent {
  form = inject(FormBuilder).nonNullable.group({
    email: ['test@email.com', Validators.required],
    fullname: ['John Don', Validators.required],
    password: ['123', Validators.required],
  });
  // private route = inject(Router);
  constructor(private userService: UserService, private route: Router) { }

  submit() {

    var data = {
      email: this.form.value.email,
      fullname: this.form.value.fullname,
      password: this.form.value.password

    }

    this.userService.signup(data).subscribe((response) => {
      this.form.reset();
      this.route.navigate(['', 'login']);
    });
  }
}
