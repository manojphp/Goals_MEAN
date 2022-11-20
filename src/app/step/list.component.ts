import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalsService } from '../goals/goals.service';
import { IGoal, IStep } from '../user.interface';

@Component({
  selector: 'app-list',
  template: ` <button (click)="add(id)" class="button is-fullwidth is-success">
      ADD NEW STEP
    </button>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">STEPS</p>
      </header>
      <div class="card-content" *ngFor="let step of stepsData">
        <div class="content">
          <p>{{ step.title }}</p>
          <p>
            Description: {{ step.description }} Dead-line:
            {{ step.deadline | date: 'dd/MM/yyyy' }}
          </p>
          <p>Status: {{ step.status }}</p>
        </div>
      </div>
      <footer class="card-footer">
        <button class="button is-fullwidth is-success m-2">Edit</button>
        <button class="button is-fullwidth is-success m-2">Delete</button>
      </footer>
    </div>`,
})
export class ListComponent implements OnInit {
  id: any;
  goalData!: any;
  stepsData: any;

  constructor(
    private datePipe: DatePipe,
    private goalService: GoalsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('goal_id');
    this.goalService.getGoalById(this.id).subscribe((response) => {
      console.log(`response `, response);
      this.goalData = response;
      this.stepsData = this.goalData.data.steps;
      console.log(this.stepsData);
    });
  }
  add(goal_id: string) {
    this.router.navigate(['goals', 'step', 'steps', goal_id, 'add']);
  }
  // edit() {
  //   this.route.navigate(['goals', 'step', 'steps', 'update', 'user_id']);
  // }
  // steps() {
  //   this.route.navigate(['goals', 'step', 'steps']);
  // }
  // delete() {}

  ngOnInit(): void {}
}
