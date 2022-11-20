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
      <div class="card-content" *ngFor="let goal of finalGoalData">
        <div class="content">
          <p><b>Goal Name: </b>{{goal.title}}</p>
          <p><b>Description: </b> {{goal.description}}</p>
          <p> <b>Dead-line: </b> {{goal.deadline | date: 'dd/MM/yyyy' }}</p>
          <p>Status: in-progress</p>
          <strong>Progress: {{ goal.progress | number : '1.2-2'}}%</strong>
          <progress class="progress is-success" value="{{goal.progress}}" max="100">{{goal.progress}}%</progress>
        </div>       
        <a (click)="steps(goal._id)" class="button is-success m-2">
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
  finalGoalData:any=[];
  constructor(private router: Router,private goalService: GoalsService) {
    this.goalService.getGoals().subscribe((response) => {
      this.goalsList = response;
      this.goaldata = this.goalsList.data;
      //console.log(this.goaldata.length);
      if(this.goaldata.length){
        
        for(let i=0;i<this.goaldata.length;i++){
          let tempArr: any=[];
          let completed_steps = 0;
          let progress = 0;
          tempArr['_id'] = this.goaldata[i]._id;
          tempArr['title'] = this.goaldata[i].title;
          tempArr['description'] = this.goaldata[i].description;
          tempArr['deadline'] = this.goaldata[i].deadline;
          let total_steps = this.goaldata[i].steps.length;
          if(this.goaldata[i].steps.length){            
            for(let j=0;j<this.goaldata[i].steps.length;j++){
              //console.log(this.goaldata[i].steps[j]);
                if(this.goaldata[i].steps[j].status =='completed' || this.goaldata[i].steps[j].status =='in-progress'){
                  completed_steps++;
                }
            }
          }
          if(total_steps>0 && completed_steps>0){
            progress = ((completed_steps/total_steps)*100);
          }
          tempArr['progress'] = progress;
          this.finalGoalData.push(tempArr);
        }
      }
      //console.log(this.finalGoalData);
    });
  }
  add() {
    this.router.navigate(['goals', 'add']);
  }
  edit() {
    this.router.navigate(['goals', 'update', this.userid]);
  }
  steps(goal_id:any) {
    this.router.navigate(['goals', 'step', 'steps',goal_id]);
  }
  delete(goal_id:any) {
    this.goalService.deleteGoalById(goal_id).subscribe((reponse) => {
      this.router.navigate(['goals']);
    });
  }

  ngOnInit(): void {
   
    
  }

 
}
