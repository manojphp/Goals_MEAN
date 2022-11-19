import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  template: ` <form [formGroup]="form" (ngSubmit)="submit()" class="form">
    <input
      placeholder="email"
      formControlName="email"
      class="input is-normal m-2"
    />

    <input
      placeholder="password"
      formControlName="password"
      class="input is-normal m-2"
      type="password"
    />

    <button type="submit" class="button is-fullwidth is-success m-2">
      LOGIN
    </button>
  </form>`,
})
export class LoginComponent {
  form: any;
  userresp:any;
  constructor(private userService: UserService, private route: Router,private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['mike@email.com', Validators.required],
      password: ['123', Validators.required],
    });
  }

  submit() {
    var formdata = {
      email:this.form.get('email')!.value,
      password:this.form.get('password')!.value
    };
    this.userService.login(formdata).subscribe((response) => {
      this.userresp = response;
      this.form.reset();
      localStorage.setItem("userid", this.userresp.data);
      this.route.navigate(['', 'goals']);
    });
  }
}
