import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StepService } from '../step/step.service';

@Component({
  selector: 'app-update',
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
      <div class="container is-fullwidth m-2">
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
export class UpdateComponent implements OnInit {
  form:any;
  step_id:any;
  goal_id:any;
  stepsData:any;
  stesVals:any;
  constructor(private stepService: StepService,private fb: FormBuilder,private router: Router,
    private route:ActivatedRoute,private datePipe: DatePipe) {
    this.form = this.fb.group({
      title: ['My Goal 1', [Validators.required, Validators.email]],
      deadline: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.step_id = this.route.snapshot.paramMap.get('step_id');
    this.goal_id = this.route.snapshot.paramMap.get('goal_id');
    this.stepService.getStepById(this.step_id,this.goal_id).subscribe((response) => {
      //console.log(response);
      this.stepsData = response;
      this.stesVals = this.stepsData.data.steps[0];
      this.form.patchValue({'title': this.stesVals.title,'status': this.stesVals.status,'description': this.stesVals.description,'deadline': this.datePipe.transform(this.stesVals.deadline, 'yyyy-MM-dd')});
    });


  }
  
  submit() {
    var formdata = {
      title:this.form.get('title')!.value,
      deadline: this.datePipe.transform(this.form.get('deadline')!.value, 'yyyy-MM-dd'),
      description:this.form.get('description')!.value,
      status:this.form.get('status')!.value
    };
    this.stepService.updateStepById(formdata,this.goal_id,this.step_id).subscribe((reponse) => {
      this.router.navigate(['goals', 'step', 'steps', this.goal_id]);
    });
  }
  ngOnInit(): void {
    console.log('You are at Step UpdateComponent')
  }
}
