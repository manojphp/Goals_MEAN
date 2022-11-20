import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsComponent } from './goals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddgoalComponent } from './addgoal.component';
import { UpdategoalComponent } from './updategoal.component';
import { DatePipe } from '@angular/common';

@NgModule({
  providers: [DatePipe],
  declarations: [GoalsComponent, UpdategoalComponent, AddgoalComponent],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: GoalsComponent },
      { path: 'list', component: GoalsComponent },
      { path: 'add', component: AddgoalComponent },
      { path: 'update/:goal_id', component: UpdategoalComponent },
      {
        path: 'step',
        loadChildren: () =>
          import('../step/step.module').then((m) => m.StepModule),
      },
    ]),
  ],
})
export class GoalModule {}
