import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IGoal } from '../user.interface';
import { GoalsService } from './goals.service';

@Component({
  selector: 'app-add',
  template: ` <form [formGroup]="form" (ngSubmit)="submit()" class="form">
    <input
      placeholder="Title"
      formControlName="title"
      class="input is-normal m-2"
    />
    <input
      type="date"
      formControlName="deadline"
      class="input is-normal m-2"
      pattern="d{4}-d{2}-d{2}"
    />
    <textarea
      placeholder="Description"
      formControlName="description"
      class="textarea is-normal m-2"
    ></textarea>
    <button type="submit" class="button is-fullwidth is-success m-2">
      Submit
    </button>
  </form>`,
})
export class AddgoalComponent implements OnInit {
  form: any;
  constructor(
    private goalService: GoalsService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      title: ['My Goal 1', [Validators.required]],
      deadline: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  submit() {
    var formdata = {
      title: this.form.get('title')!.value,
      deadline: this.datePipe.transform(
        this.form.get('deadline')!.value,
        'yyyy-MM-dd'
      ),
      description: this.form.get('description')!.value,
    };
    //console.log(formdata);return false;
    this.goalService.addGoal(formdata).subscribe((response) => {
      this.router.navigate(['goals', 'list']);
    });
  }
  ngOnInit(): void {}
}
