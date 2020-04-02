import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { ActivityEditComponent } from './activity-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ActivityEditGuard implements CanDeactivate<ActivityEditComponent> {
  canDeactivate(component: ActivityEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.activityForm.dirty) {
      const activityName = component.activityForm.get('activityName').value || 'New Activity';
      return confirm(`Navigate away and lose all changes to ${activityName}?`);
    }
    return true;
  }
}
