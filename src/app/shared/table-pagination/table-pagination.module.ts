import { PipeCustomModule } from './../pipes/pipe-custom.module';
import { DialogModule } from '../components/dialog/confirm-dialog/dialog.module';
import { LoadSpinnerModule } from '../components/load-spinner/load-spinner.module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from './table-pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorI18nService } from './services/paginator-i18n.service';
import { ValuePipe } from './pipe/value.pipe';


const EXPORTMATERIAL = [
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  CdkTableModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    TablePaginationComponent,
    ValuePipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    LoadSpinnerModule,
    DialogModule,
    PipeCustomModule,
    ...EXPORTMATERIAL,
    PipeCustomModule
  ],
  providers: [PaginatorI18nService],
  exports: [TablePaginationComponent]
})
export class TablePaginationModule { }
