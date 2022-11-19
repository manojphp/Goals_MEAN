import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoalsService } from '../goals/goals.service';

@Component({
  selector: 'app-update',
  template: `
    <form [formGroup]="form" onsubmit="submit()" class="form">
      <input
        placeholder="Title"
        formControlName="title"
        class="input is-normal m-2"
      />
      <input
        type="date"
        formControlName="deadline"
        class="input is-normal m-2"
      />
      <div class="container is-fullwidth m-2" name="status">
        <label> Status: </label>
        <select name="status" id="status">
          <option value="not-strated">not-strated</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select>
      </div>
      <textarea
        placeholder="Description"
        formControlName="description"
        class="textarea is-normal m-2"
      ></textarea>
      <button type="submit" class="button is-fullwidth is-success m-2">
        Submit
      </button>
    </form>
  `,
})
export class UpdateComponent implements OnInit {
  private router = inject(Router);
  constructor(private goalService: GoalsService,private fb: FormBuilder) {}
  form = this.fb.group({
    title: ['My Goal 1', [Validators.required, Validators.email]],
    deadline: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  submit() {
    this.goalService.addGoal(this.form.value as any).subscribe((reponse) => {
      this.router.navigate(['goals', 'list']);
    });
  }
  ngOnInit(): void {}
}
