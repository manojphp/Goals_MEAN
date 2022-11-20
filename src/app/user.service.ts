import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }
  login(user: { email: string; password: string }) {
    return this.http.post<{ email: string; password: string }>(
      environment.server + '/users/login',
      user
    );
  }
  signup(data: any) {
    return this.http.post<IUser>(environment.server + '/users/signup', data);
  }
}
