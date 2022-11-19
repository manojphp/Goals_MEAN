import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StepService } from '../step/step.service';

@Component({
  selector: 'app-add',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
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
      <div class="container is-fullwidth m-2" formControlName="status">
        <label> Status: </label>
        <select formControlName="status" id="status">
          <option value="not-strated">not-strated</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select>
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

  form:any;
  constructor(private datePipe: DatePipe ,private router: Router,private stepService: StepService,private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['My Step 1', [Validators.required]],
      deadline: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  
  submit() {
    var formdata = {
      title:this.form.get('title')!.value,
      deadline: this.datePipe.transform(this.form.get('deadline')!.value, 'yyyy-MM-dd'),
      description:this.form.get('description')!.value,
      status:this.form.get('status')!.value,
    };
    this.stepService.addStep(formdata).subscribe((reponse) => {
      this.router.navigate(['steps', 'list']);
    });
  }
  ngOnInit(): void {}
}
