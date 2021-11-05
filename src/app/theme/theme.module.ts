import { AccordionDirective } from './sidemenu/accordion.directive';
import { AccordionItemDirective } from './sidemenu/accordionItem.directive';
import { AccordionAnchorDirective } from './sidemenu/accordionanchor.directive';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { MatRippleModule } from '@angular/material/core';
import { UserPanelComponent } from './sidebar/user-panel/user-panel.component';
import { MatPaginatorIntl } from '@angular/material/paginator';

const MATERIALMODULE: any[] = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    SidemenuComponent,
    HeaderComponent,
    AccordionDirective,
    AccordionItemDirective,
    AccordionAnchorDirective,
    UserPanelComponent,
  ],
  imports: [
    CommonModule,
    ...MATERIALMODULE,
    RouterModule,
    FlexLayoutModule
  ],
})
export class ThemeModule { }
