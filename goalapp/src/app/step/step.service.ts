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
    return this.http.get<{ data: IStep[] }>(
      environment.server + '/goals:' + goal_id + `/steps`
    );
  }
  getStepById(step_id: string, user_id: string, goal_id: string) {
    return this.http.get<{ data: IStep }>(
      environment.server +
        '/steps/user/:' +
        user_id +
        `/goal/:` +
        goal_id +
        `/` +
        step_id
    );
  }
  addStep(step:any) {
    return this.http.post(environment.server + '/user/'+this.userid+'/goal/:goal_id/steps', step);
  }
  updateStepById(step: IStep, step_id: string) {
    return this.http.patch<IStep>(
      environment.server + '/steps/' + step_id,
      step
    );
  }
  deleteStepById(step_id: string) {
    return this.http.delete(environment.server + '/steps/' + step_id);
  }
}
