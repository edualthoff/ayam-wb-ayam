import { ProdutoRequestService } from './../../../core/services/https/produto/produto-request.service';
import { IDisplayedColumns,  } from './../../../shared/table-pagination/table-pagination.component';
import { Component, OnInit,  } from '@angular/core';
import { DatasourceTableService } from '../services/table/datasource-table.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto-dashboard',
  templateUrl: './produto-dashboard.component.html',
  styleUrls: ['./produto-dashboard.component.scss'],
  providers: [DatasourceTableService]
})
export class ProdutoDashboardComponent implements OnInit {

  displayedColumns = TABLECOLUMNS;
  dataSource;

  constructor(produtoRequestService: ProdutoRequestService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.dataSource = new DatasourceTableService(produtoRequestService);
  }

  ngOnInit(): void {

  }

  eventEditar(index): void {
    this.route.navigate([`./${index.id}`], {relativeTo: this.activatedRoute});
  }
}

export const TABLECOLUMNS: IDisplayedColumns[] = [
  {name: '#', variableName: 'id'},
  {name: 'Nome', variableName: 'nome'},
  {name: 'Nome Curto', variableName: 'nomeCurto'},
];
