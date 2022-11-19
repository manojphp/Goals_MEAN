import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  login(formdata:any) {
    return this.http.post(
      environment.server + '/users/login',
      formdata
    );
  }
  signup(formData:any) {
    return this.http.post<IUser>(environment.server + '/users/signup', formData);
  }
}
