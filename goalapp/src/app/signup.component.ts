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
  
  // private route = inject(Router);
  form: any;
  constructor(private userService: UserService, private route: Router,private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['test@email.com', Validators.required],
      fullname: ['John Don', Validators.required],
      password: ['123', Validators.required],
    });
  }

  submit() {
    // let formData = new FormData();
    // formData.append('email', this.form.get('email')!.value);
    // formData.append('fullname', this.form.get('fullname')!.value);
    // formData.append('password', this.form.get('password')!.value);

    var formdata = {
      fullname:this.form.get('fullname')!.value,
      email:this.form.get('email')!.value,
      password:this.form.get('password')!.value
    };
    this.userService.signup(formdata).subscribe((response) => {
      this.form.reset();
      this.route.navigate(['', 'login']);
    });
  }
}
