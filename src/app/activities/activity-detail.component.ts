import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Activity } from './activity';
import { ActivityService } from './activity.service';

@Component({
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
  pageTitle = 'Activity Detail';
  errorMessage = '';
  activity: Activity | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private activityService: ActivityService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getActivity(id);
    }
  }

  getActivity(id: number) {
    this.activityService.getActivity(id).subscribe({
      next: activity => this.activity = activity,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/activities']);
  }

}
