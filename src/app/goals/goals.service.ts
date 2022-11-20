import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGoal, IStep } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class GoalsService implements OnInit {
  userid = localStorage.getItem('userid');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getGoals() {
    return this.http.get<any>(
      environment.server + '/goals/user/' + this.userid
    );
  }
  getGoalById(goal_id: string) {
    return this.http.get(
      environment.server + '/goals/user/' + this.userid + '/goal/' + goal_id
    );
  }
  addGoal(formdata: any) {
    return this.http.post(
      environment.server + '/goals/user/' + this.userid,
      formdata
    );
  }
  updateGoalById(goal: any, goal_id: string) {
    return this.http.patch<IGoal>(
      environment.server + '/goals/user/' + this.userid + '/goal/' + goal_id,
      goal
    );
  }
  deleteGoalById(goal_id: string) {
    return this.http.delete(
      environment.server + '/goals/user/' + this.userid + '/goal/' + goal_id
    );
  }
}
