import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GoalsService } from './goals.service';

@Component({
  selector: 'app-update',
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="submit()">
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
export class UpdategoalComponent {
  //private router = inject(Router);
  id: any;
  goalsData:any;
  goalsVals:any;
  form:any;
  constructor(private datePipe: DatePipe ,private goalService: GoalsService,private fb: FormBuilder,
    private router: Router,private route: ActivatedRoute) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.email]],
      deadline: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.id = this.route.snapshot.paramMap.get('goal_id');
    this.goalService.getGoalById(this.id).subscribe((response) => {
      console.log(response);
      this.goalsData = response;
      this.goalsVals = this.goalsData.data;
      this.form.patchValue({'title': this.goalsVals.title,'description': this.goalsVals.description,'deadline': this.datePipe.transform(this.goalsVals.deadline, 'yyyy-MM-dd')});
    });
  }
  
  submit() {
    var formdata = {
      title:this.form.get('title')!.value,
      deadline: this.datePipe.transform(this.form.get('deadline')!.value, 'yyyy-MM-dd'),
      description:this.form.get('description')!.value
    };
    this.goalService.updateGoalById(formdata,this.id).subscribe((reponse) => {
      this.router.navigate(['goals', 'list']);
    });
  }
  ngOnInit(): void {
    
  }
}
