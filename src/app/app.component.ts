import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <h1 class='navbar-brand' >{{pageTitle}}</h1>
    <nav class='navbar navbar-expand navbar-light bg-light'>
      <ul class='navbar-nav'>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active'
              [routerLink]="['/welcome']">Home</a>
        </li>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="['/activities']">Activity List</a>
        </li>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="['/activities/0/edit']">Add Activity</a>
        </li>
      </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Little children activities';
}
