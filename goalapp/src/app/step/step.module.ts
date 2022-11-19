import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { UpdateComponent } from './update.component';
import { ListComponent } from './list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@NgModule({
  providers:[DatePipe],
  declarations: [AddComponent, UpdateComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'steps', component: ListComponent },
      { path: 'steps/add', component: AddComponent },
      { path: 'steps/update/:step_id', component: UpdateComponent },
    ]),
  ],
})
export class StepModule {}
