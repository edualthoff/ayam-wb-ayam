import { ListIconModule } from './../../shared/components/list-icon/list-icon.module';
import { CaracteristicaService } from './services/caracteristica.service';
import { CaracteristicaTableService } from './services/table/caracteristica-table.service';
import { DatasourceTableService } from './services/table/datasource-table.service';
import { LoadSpinnerModule } from '../../shared/components/load-spinner/load-spinner.module';
import { FileUploadModule } from './../../shared/file-upload/file-upload.module';
import { OutletProdutoComponent } from './outlet-produto.component';
import { EditorTextoModule } from './../../shared/editor-texto/editor-texto.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TablePaginationModule } from './../../shared/table-pagination/table-pagination.module';
import { RouterModule } from '@angular/router';
import { ProdutoDashboardComponent } from './produto-dashboard/produto-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { CaracteristicaComponent } from './caracteristica/caracteristica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProdutoCrudComponent } from './produto-dashboard/produto-crud/produto-crud.component';
import { MatSelectModule } from '@angular/material/select';
import { CaracteristicasCrudComponent } from './caracteristica/caracteristicas-crud/caracteristicas-crud.component';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';


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
    ProdutoDashboardComponent,
    CaracteristicaComponent,
    OutletProdutoComponent,
    ProdutoCrudComponent,
    CaracteristicasCrudComponent
   ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    TablePaginationModule,
    ...MATERIALMODULE,
    EditorTextoModule,
    FileUploadModule,
    LoadSpinnerModule,
    ListIconModule
  ],
  providers: [DatasourceTableService, CaracteristicaTableService, CaracteristicaService]
})
export class ProdutoModule { }
