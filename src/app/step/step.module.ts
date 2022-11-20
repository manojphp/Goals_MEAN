import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { UpdateComponent } from './update.component';
import { ListComponent } from './list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddComponent, UpdateComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'steps/:goal_id', component: ListComponent },
      { path: 'steps/:goal_id/add', component: AddComponent },
      { path: 'steps/:goal_id/update/:step_id', component: UpdateComponent },
    ]),
  ],
})
export class StepModule {}
