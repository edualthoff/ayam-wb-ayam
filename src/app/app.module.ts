import { PipeCustomModule } from './shared/pipes/pipe-custom.module';
import { LoadSpinnerModule } from './shared/components/load-spinner/load-spinner.module';
import { httpInterceptorProviders } from './core/interceptors/index';
import { BASE_URL } from './core/interceptors/base-url-interceptor';
import { environment } from './../environments/environment';
import { RouterModule } from '@angular/router';
import { ThemeModule } from './theme/theme.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TablePaginationModule } from './shared/table-pagination/table-pagination.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorI18nService } from './shared/table-pagination/services/paginator-i18n.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ThemeModule,
    RouterModule,
    TablePaginationModule,
    LoadSpinnerModule,
    PipeCustomModule.forRoot()
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PaginatorI18nService},
    { provide: BASE_URL, useValue: environment.baseUrl }, httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /*
  FileAssets: FileList
  customIcons: Array<[string, string]> = [["hat", "assets/hat.svg"]];
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.customIcons.forEach(([iconName, iconPath]) => {
      iconRegistry.addSvgIcon(
        iconName,
        sanitizer.bypassSecurityTrustResourceUrl(iconPath)
      );
    });
  }*/

}
