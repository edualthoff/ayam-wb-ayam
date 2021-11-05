import { PipeCustomModule } from './../../shared/pipes/pipe-custom.module';
import { PreviewPostModule } from './../../shared/components/dialog/preview-post/preview-post.module';
import { ListaTableService } from './services/table/lista-table.service';
import { TablePaginationModule } from './../../shared/table-pagination/table-pagination.module';
import { FileUploadModule } from './../../shared/file-upload/file-upload.module';
import { EditorTextoModule } from './../../shared/editor-texto/editor-texto.module';
import { LoadSpinnerModule } from '../../shared/components/load-spinner/load-spinner.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformativoRoutingModule } from './informativo-routing.module';
import { InformativoComponent } from './informativo.component';
import { ListaComponent } from './lista/lista.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CrudComponent } from './crud/crud.component';
import { PreviewComponent } from './preview/preview.component';

const MATERIALMODULE: any[] = [
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSelectInfiniteScrollModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatRadioModule
];


@NgModule({
  declarations: [
    InformativoComponent,
    ListaComponent,
    CrudComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    InformativoRoutingModule,
    ...MATERIALMODULE,
    EditorTextoModule,
    FileUploadModule,
    LoadSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    TablePaginationModule,
    PreviewPostModule,
    PipeCustomModule,
    LoadSpinnerModule
  ],
  providers: [ListaTableService]
})
export class InformativoModule { }
