import { InformativoRequestService } from './../../../core/services/https/informativo/informativo-request.service';
import { PreviewComponent } from './../preview/preview.component';
import { AdItemPreview } from './../../../shared/components/dialog/preview-post/ad-item.component';
import { InformativoDto } from '../../../core/interfaces/informativo.dto';
import { BreakpointsApp } from './../../../shared/utils/viewport';
import { PreviewDialogModal } from './../../../shared/components/dialog/preview-post/preview-post.component';
import { ListaTableService } from './../services/table/lista-table.service';
import { IDisplayedColumns } from './../../../shared/table-pagination/table-pagination.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  displayedColumns = TABLECOLUMNS;
  dataSource;

  constructor(http: InformativoRequestService, private route: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    this.dataSource = new ListaTableService(http);
   }

  ngOnInit(): void {
  }

  eventEditar(index): void {
    this.route.navigate([`./${index.id}`], {relativeTo: this.activatedRoute});
  }

  eventPreview(obj: InformativoDto): void {
    this.dialog.ngOnDestroy();
    const dialogData = new PreviewDialogModal(this.dialog, BreakpointsApp.IPHONEX,
      new AdItemPreview(PreviewComponent, {info: obj}));
    dialogData.montDialog();
    // this.route.navigate([`./${index.id}`], {relativeTo: this.activatedRoute});
  }
}

export const TABLECOLUMNS: IDisplayedColumns[] = [
  {name: '#', variableName: 'id'},
  {name: 'Titulo', variableName: 'titulo'},
  {name: 'Tipo', variableName: 'tipo'},
  {name: 'Destacar', variableName: 'destacar', nameConversion: {trueName: 'Sim', falseName: 'Não'}},
  {name: 'Status', variableName: 'status', nameConversion: {trueName: 'Publicado', falseName: 'Revisão'}},
  {name: 'Data', variableName: 'dateCreated'},
];
