import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  template: ` <button class="button is-fullwidth is-success" (click)="add()">
      ADD NEW STEP
    </button>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">STEP 1</p>
      </header>
      <div class="card-content">
        <div class="content">
          <p>Description: descrease 10kg Dead-line: 1412180887</p>
          <p>Status: in-progress</p>
        </div>
      </div>
      <footer class="card-footer">
        <button (click)="edit()" class="button is-fullwidth is-success m-2">
          Edit
        </button>
        <button (click)="delete()" class="button is-fullwidth is-success m-2">
          Delete
        </button>
      </footer>
    </div>`,
})
export class ListComponent implements OnInit {
  constructor(private route: Router) {}
  add() {
    this.route.navigate(['goals', 'step', 'steps', 'add']);
  }
  edit() {
    this.route.navigate(['goals', 'step', 'steps', 'update', 'user_id']);
  }
  steps() {
    this.route.navigate(['goals', 'step', 'steps']);
  }
  delete() {}

  ngOnInit(): void {}
}
