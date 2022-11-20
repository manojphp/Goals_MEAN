import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStep } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  userid = localStorage.getItem("userid");

  constructor(private http: HttpClient) {}

  getSteps(goal_id: string) {
    return this.http.get(
      environment.server + '/goals/user/'+this.userid+'/goal/'+goal_id+'/steps'
    );
  }
  getStepById(step_id: string, goal_id: string) {
    return this.http.get(
      environment.server +
        '/goals/user/' +
        this.userid +
        `/goal/` +
        goal_id +
        `/steps/` +
        step_id
    );
  }
  addStep(step:any,goal_id:any) {
    return this.http.post(environment.server + '/goals/user/'+this.userid+'/goal/'+goal_id+'/steps', step);
  }
  updateStepById(step: any, goal_id:string, step_id: string) {
    return this.http.patch(
      environment.server + '/goals/user/'+this.userid+'/goal/'+goal_id+'/steps/' + step_id,
      step
    );
  }
  deleteStepById(goal_id:string,step_id: string) {
    return this.http.delete(environment.server + '/goals/'+goal_id+'/steps/' + step_id);
  }
}
