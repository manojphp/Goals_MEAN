import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalsService } from '../goals/goals.service';
import { IStep } from '../user.interface';
import { StepService } from './step.service';

@Component({
  selector: 'app-add',
  template: `
    <form [formGroup]="form" onsubmit="submit()" class="form">
      <input
        placeholder="Title"
        formControlName="title"
        class="input is-normal m-2"
      />
      <input
        type="date"
        formControlName="deadline"
        class="input is-normal m-2"
      />
      <div class="container is-fullwidth m-2">
        <label> Status: </label>
        <input formControlName="status" type="radio" value="not-started" />
        not-started
        <input formControlName="status" type="radio" value="in-progress" />
        in-progress
        <input formControlName="status" type="radio" value="completed" />
        completed
        <!-- <select formControlName="status" id="status">
          <option value="not-started">not-started</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select> -->
      </div>

      <textarea
        placeholder="Description"
        formControlName="description"
        class="textarea is-normal m-2"
      ></textarea>
      <button type="submit" class="button is-fullwidth is-success m-2">
        Submit
      </button>
    </form>
  `,
})
export class AddComponent implements OnInit {
  id: any;
  form: any;
  formdata: any;
  constructor(
    private stepService: StepService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.id = this.route.snapshot.paramMap.get('goal_id');
    this.form = this.fb.group({
      title: ['Step 1', [Validators.required]],
      deadline: ['', [Validators.required]],
      description: ['do some coding', [Validators.required]],
      status: 'not-started',
    });
  }

  submit() {
    this.formdata = {
      title: this.form.get('title')!.value,
      deadline: this.datePipe.transform(
        this.form.get('deadline')!.value,
        'yyyy-MM-dd'
      ),
      description: this.form.get('description')!.value,
      status: this.form.get('status')!.value,
    };
    console.log(this.formdata, `here`);
    // return false;
    this.stepService.addStep(this.formdata, this.id).subscribe((response) => {
      // this.router.navigate(['goals', 'list']);
    });
  }
  ngOnInit(): void {}
}
