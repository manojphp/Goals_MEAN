import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StepService } from '../step/step.service';

@Component({
  selector: 'app-list',
  template: ` <button class="button is-info" (click)="back()">Back</button><br><br>
    <button class="button is-fullwidth is-success" (click)="add()">
      ADD NEW STEP
    </button>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">My Goal Steps</p>
      </header>
      <div class="card-content" *ngFor="let step of stepdata">
        <div class="content">
          <p><b>Title:</b> {{step.title}}</p>
          <p><b>Description: </b> {{step.description}}</p>
          <p><b>Dead-line:</b> {{step.deadline | date: 'dd/MM/yyyy' }}</p>
          <p>Status: {{step.status}}</p>
        </div>
        <button (click)="edit(step._id)" class="button is-success m-2">
          Edit
        </button>
        <button (click)="delete(step._id)" class="button is-danger m-2">
          Delete
        </button>
      </div>
      <footer class="card-footer">
        
      </footer>
    </div>`,
})
export class ListComponent implements OnInit {
  stepsList:any;
  stepdata:any;
  goal_id:any;
  constructor(private route: Router,private stepService: StepService,private router: ActivatedRoute,private datepipe:DatePipe) {
    this.goal_id = this.router.snapshot.paramMap.get('goal_id');
  }
  add() {
    this.route.navigate(['goals', 'step', 'steps', this.goal_id, 'add']);
  }
  edit(step_id:string) {
    this.route.navigate(['goals', 'step', 'steps', 'update', step_id,this.goal_id]);
  }
  steps() {
    this.route.navigate(['goals', 'step', 'steps']);
  }
  back() {
    this.route.navigate(['goals', 'list']);
  }
  delete(step_id:string) {
    this.stepService.deleteStepById(this.goal_id,step_id).subscribe((reponse) => {
      //console.log(reponse);
      //this.route.navigate(['goals', 'list']);
      window.location.reload();
    });
  }

  ngOnInit(): void {
    console.log('You are at ListComponent')
    this.stepService.getSteps(this.goal_id).subscribe((response) => {
      this.stepsList = response;
      this.stepdata = this.stepsList.data;
    });
  }
}
