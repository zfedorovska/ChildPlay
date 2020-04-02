import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Activity } from './activity';
import { ActivityService } from './activity.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './activity-edit.component.html'
})
export class ActivityEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Activity Edit';
  errorMessage: string;
  activityForm: FormGroup;

  activity: Activity;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.activityForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private activityService: ActivityService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Activity name is required.',
        minlength: 'Activity name must be at least three characters.',
        maxlength: 'Activity name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Activity code is required.'
      },
      starRating: {
        range: 'Rate the activity between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      activityName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      activityAge: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: '',
      skillDevelopment: ''
    });

    // Read the activity Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getActivity(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.activityForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.activityForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getActivity(id: number): void {
    this.activityService.getActivity(id)
      .subscribe({
        next: (activity: Activity) => this.displayActivity(activity),
        error: err => this.errorMessage = err
      });
  }

  displayActivity(activity: Activity): void {
    if (this.activityForm) {
      this.activityForm.reset();
    }
    this.activity = activity;

    if (this.activity.id === 0) {
      this.pageTitle = 'Add Activity';
    } else {
      this.pageTitle = `Edit Activity: ${this.activity.activityName}`;
    }

    // Update the data on the form
    this.activityForm.patchValue({
      activityName: this.activity.activityName,
      activityAge: this.activity.activityAge,
      starRating: this.activity.starRating,
      description: this.activity.description,
      skillDevelopment: this.activity.skillDevelopment,
    });
    this.activityForm.setControl('tags', this.fb.array(this.activity.tags || []));
  }

  deleteActivity(): void {
    if (this.activity.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the activity: ${this.activity.activityName}?`)) {
        this.activityService.deleteActivity(this.activity.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveActivity(): void {
    if (this.activityForm.valid) {
      if (this.activityForm.dirty) {
        const p = { ...this.activity, ...this.activityForm.value };

        if (p.id === 0) {
          this.activityService.createActivity(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.activityService.updateActivity(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.activityForm.reset();
    this.router.navigate(['/activities']);
  }
}
