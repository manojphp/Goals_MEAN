import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { GoalsService } from './goals.service';

@Component({
  selector: 'app-goals',
  template: ` <button class="button is-fullwidth is-success" (click)="add()">
      ADD NEW GOAL
    </button>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">My Goal Lists</p>
      </header>
      <div class="card-content" *ngFor="let goal of goaldata">
        <div class="content">
          <p><b>Goal Name: </b>{{ goal.title }}</p>
          <p><b>Description: </b> {{ goal.description }}</p>
          <p><b>Dead-line: </b> {{ goal.deadline | date: 'dd/MM/yyyy' }}</p>
          <p style="color: red"><b>Warning flag: </b> TOO LATE !!!</p>
          <strong>Progress: </strong>
          <progress
            class="progress is-success"
            value="{{ progressValue }}"
            max="100"
          >
            33%
          </progress>
        </div>
        <div style="display: flex; flex-direction: row">
          <a
            (click)="steps(goal._id)"
            class="button is-fullwidth is-success m-2"
            >Steps</a
          >
          <a
            routerLink="/goals/update/{{ goal._id }}"
            class="button is-fullwidth is-info m-2"
          >
            Edit</a
          >
          <button
            (click)="delete(goal._id)"
            class="button is-fullwidth is-danger m-2"
          >
            Delete
          </button>
        </div>
      </div>
      <footer class="card-footer"></footer>
    </div>`,
})
export class GoalsComponent implements OnInit {
  userid = localStorage.getItem('userid');
  goalsList: any;
  goaldata: any;

  constructor(private router: Router, private goalService: GoalsService) {}
  add() {
    this.router.navigate(['goals', 'add']);
  }
  edit() {
    this.router.navigate(['goals', 'update', this.userid]);
  }
  steps(goal_id: any) {
    this.router.navigate(['goals', 'step', 'steps', goal_id]);
  }
  delete(goal_id: any) {
    this.goalService.deleteGoalById(goal_id).subscribe((reponse) => {
      this.router.navigate(['goals']);
    });
  }

  progressValue: number = 0;
  stateValue: number = 0;
  stepsStates: String[] = ['not-started', 'in-progress', 'completed'];
  ngOnInit(): void {
    this.goalService.getGoals().subscribe((response) => {
      this.goalsList = response;
      this.goaldata = this.goalsList.data;
      this.goaldata.forEach((goal: { steps: any[] }) => {
        goal.steps.forEach((step) => {
          this.stepsStates.push(step.status);
        });
      });

      const stepsLength = this.stepsStates.length;
      this.stepsStates.forEach((el) => {
        if (el === 'completed') {
          this.stateValue += 2;
        } else if (el === 'in-progress') {
          this.stateValue += 1;
        } else {
          this.stateValue += 0;
        }
      });
      if (this.stateValue === 0) {
        this.progressValue = 0;
      } else if (this.stateValue === 2 * stepsLength) {
        this.progressValue = 100;
      } else {
        this.progressValue = (this.stateValue * 50) / stepsLength;
      }
      // console.log(this.stepsStates);
    });
  }
}
