import { CaracteristicaRequestService } from './../../../core/services/https/caracteristica/caracteristica-request.service';
import { IDisplayedColumns } from './../../../shared/table-pagination/table-pagination.component';
import { CaracteristicaTableService } from './../services/table/caracteristica-table.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-caracteristica',
  templateUrl: './caracteristica.component.html',
  styleUrls: ['./caracteristica.component.scss']
})
export class CaracteristicaComponent implements OnInit {
  displayedColumns = TABLECOLUMNS ;
  list ;
  dataSource;

  constructor(caracteristicaRequestService: CaracteristicaRequestService, private route: Router,
              private activatedRoute: ActivatedRoute) {
    this.dataSource = new CaracteristicaTableService(caracteristicaRequestService);
  }

  ngOnInit(): void {
  }

  eventEditar(index): void {
    this.route.navigate([`./${index.id}`], {relativeTo: this.activatedRoute});
  }
}

export const TABLECOLUMNS: IDisplayedColumns[] = [
  {name: '#', variableName: 'id'},
  {name: 'nome', variableName: 'nome'},
  {name: 'Tipo', variableName: 'tipo'},
  {name: 'Icon', variableName: 'pathUrlIcon'},
];
