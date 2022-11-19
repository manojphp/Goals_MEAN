import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
          <p><b>Goal Name: </b>{{goal.title}}</p>
          <p><b>Description: </b> {{goal.description}}</p>
          <p> <b>Dead-line: </b> {{goal.deadline | date: 'dd/MM/yyyy' }}</p>
          <p>Status: in-progress</p>
          <strong>Progress: </strong>
          <progress class="progress is-success" value="20" max="100">
            33%
          </progress>
        </div>       
        <a  class="button is-success m-2">
          Steps</a>
        <a routerLink="/goals/update/{{goal._id}}" class="button is-info m-2">
          Edit</a>
        <button (click)="delete(goal._id)" class="button is-danger m-2">
          Delete</button>      
    </div>
    <footer class="card-footer"></footer>
      
    </div>`,
})
export class GoalsComponent implements OnInit {
  userid = localStorage.getItem("userid");
  goalsList:any;
  goaldata:any;
  constructor(private router: Router,private goalService: GoalsService) {}
  add() {
    this.router.navigate(['goals', 'add']);
  }
  edit() {
    this.router.navigate(['goals', 'update', this.userid]);
  }
  steps() {
    this.router.navigate(['goals', 'step', 'steps']);
  }
  delete(goal_id:any) {
    this.goalService.deleteGoalById(goal_id).subscribe((reponse) => {
      this.router.navigate(['goals']);
    });
  }

  ngOnInit(): void {
    this.goalService.getGoals().subscribe((response) => {
      this.goalsList = response;
      this.goaldata = this.goalsList.data;
    });
  }
}
