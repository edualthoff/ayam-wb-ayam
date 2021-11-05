import { admin } from './../../../core/authentication/user';
import { User } from './../../../core/authentication/interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  template: `
  <div class="app-user-panel" fxLayout="column" fxLayoutAlign="center center">
    <img class="app-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64" />
    <h4 class="app-user-panel-name">{{ user.name }}</h4>
    <h5 class="app-user-panel-email">{{ user.email }}</h5>
    <div class="app-user-panel-icons">
      <a routerLink="/profile/overview" mat-icon-button>
        <mat-icon class="icon-20">account_circle</mat-icon>
      </a>
      <a routerLink="/profile/settings" mat-icon-button>
        <mat-icon class="icon-20">settings</mat-icon>
      </a>
      <a (click)="logout()" mat-icon-button>
        <mat-icon class="icon-20">exit_to_app</mat-icon>
      </a>
    </div>
  </div>
`,
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  user!: User;

  constructor(private router: Router) {
    this.user = admin;
  }

  ngOnInit(): void {
    /* this.auth.user().subscribe(user => (this.user = user)); */
  }

  logout(): void  {
    /* this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login')); */
  }

}
