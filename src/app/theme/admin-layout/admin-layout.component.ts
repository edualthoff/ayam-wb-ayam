import { SettingsService } from './../../core/bootstrap/settings.service';
import { Component, HostBinding, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  options = this.settings.getOptions();
  private layoutChangesSubscription: Subscription;
  private isMobileScreen = false;
  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private settings: SettingsService ) {

    this.layoutChangesSubscription = this.breakpointObserver
    .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
    .subscribe(state => {
      // SidenavOpened must be reset true when layout changes
      this.options.sidenavOpened = true;

      this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
      this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];

    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.layoutChangesSubscription.unsubscribe();
  }


  sidenavOpenedChange(isOpened: boolean): void {
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

}
