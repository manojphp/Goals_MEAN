import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<nav class="navbar is-transparent">
      <div
        id="navbarExampleTransparentExample "
        class="navbar-menu has-background-link-light"
      >
        <div class="navbar-start ">
          <a class="navbar-item has-text-link-dark" [routerLink]="['']">
            Home
          </a>
          <!-- *ngIf="state.token" -->
          <a
            class="navbar-item has-text-link-dark"
            [routerLink]="['goals', 'list']"
          >
            Goals
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control" *ngIf="!token; else logoutButton">
                <button class="button is-primary mr-2" (click)="login()">
                  Login
                </button>
                <button class="button is-primary" (click)="signup()">
                  Signup
                </button>
              </p>
              <ng-template #logoutButton>
                <button class="button is-primary" (click)="logout()">
                  LogOut
                </button>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="hero has-background-primary-light">
      <div class="hero-body">
        <p class="title has-text-info">MEAN Stuck</p>
        <!-- <marquee
          ><p class="subtitle has-text-link-dark">
            Personal Goal traker application V-0.0.1
           
          </p>
        </marquee> -->
      </div>
    </section>

    <div class="container">
      <div class="notification is-primary is-success is-light">
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <figure class="image is-50x100">
          <img src="" />
          <p>
            <strong>Cop ©</strong> All rights reserved
            <strong>Team: </strong>JOhn, Edwrad
          </p>
        </figure>
      </div>
    </footer>`,
})
export class AppComponent {
  token!: string;
  //private router = inject(Router);
  constructor(private router: Router) {}
  login() {
    this.router.navigate(['', 'login']);
  }
  signup() {
    this.router.navigate(['', 'signup']);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['', 'login']);
  }
}
