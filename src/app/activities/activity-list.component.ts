import { Component, OnInit } from '@angular/core';

import { Activity } from './activity';
import { ActivityService } from './activity.service';

@Component({
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  pageTitle = 'Activity List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredActivities = this.listFilter ? this.performFilter(this.listFilter) : this.activities;
  }

  filteredActivities: Activity[] = [];
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) { }

  performFilter(filterBy: string): Activity[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.activities.filter((activity: Activity) =>
      activity.activityName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe({
      next: activities => {
        this.activities = activities;
        this.filteredActivities = this.activities;
      },
      error: err => this.errorMessage = err
    });
  }
}
