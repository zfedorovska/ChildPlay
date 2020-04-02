import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {ActivityData } from './activity-data';

import { ActivityListComponent } from './activity-list.component';
import { ActivityDetailComponent } from './activity-detail.component';
import { ActivityEditComponent } from './activity-edit.component';
import { ActivityEditGuard } from './activity-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ActivityData),
    RouterModule.forChild([
      { path: 'activities', component: ActivityListComponent },
      { path: 'activities/:id', component: ActivityDetailComponent },
      {
        path: 'activities/:id/edit',
        canDeactivate: [ActivityEditGuard],
        component: ActivityEditComponent
      }
    ])
  ],
  declarations: [
    ActivityListComponent,
    ActivityDetailComponent,
    ActivityEditComponent
  ]
})
export class ActivityModule { }
