import { ConfirmDialogModel } from './../components/dialog/confirm-dialog/confirm-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';


export interface IDisplayedColumns {
  name: string;
  variableName: string;
  nameConversion?: {trueName: any, falseName: any};
}

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements AfterViewInit, OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedVariable: string[];

  @Input() displayedColumns: IDisplayedColumns[];
  @Input() editarExcluir = true;
  @Input() paginationDesabled = false;
  @Input() dataSource;
  @Input() listData: any[] = null;
  @Input() inputTable;
  @Input() sortVariableName: string;
  @Input() desabilitarPreview = false;

  @Output() editar = new EventEmitter<any>();
  @Output() preview = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.displayedVariable = [];
    this.displayedColumns.forEach(x => {
      this.displayedVariable.push(x.variableName);
    });
    this.habilitarEditarExcluir();
  }

  ngAfterViewInit(): void {
    if (this.listData === null) {
      if (this.inputTable !== undefined) {
        // server-side search
        fromEvent(this.inputTable, 'keyup')
          .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
              this.paginator.pageIndex = 0;
              this.loadTodosPage();
            })
          )
          .subscribe();
      } else {
        this.inputTable = Input();
      }
      this.loadTodosPage();
      this.loadPaginator();
    } else {
      this.dataSource = new MatTableDataSource<any>();
      this.dataSource.data = this.listData;
    }
  }

  /** Recupera o valor na lista de acordoc om a variavel passada pela tabela.. comparando a variavel da lista com a
  * variaveo informant no input
  */
  getValueVarNameNews(obj: object, variableName: string): any {
    return Object.getOwnPropertyDescriptor(obj, variableName).value;
  }

  private loadPaginator(): any {
    // Reseta os status do sorting Asc e Desc
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // Atualizar a Lista passando a pagina e o Sorting como parametro
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadTodosPage())
      )
      .subscribe();
  }

  public loadTodosPage(): any {
    this.dataSource.load(this.inputTable.value, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
  }

  private habilitarEditarExcluir(): any {
    if (this.editarExcluir && !this.displayedVariable.includes('editar')) {
      this.displayedVariable.push('editar');
    }
  }

  /**
   * Emite um evento com o elemento que o usuario quer ver
   * @param element
   */
  buttonPreview(element: object): any {
    this.preview.emit(element);
  }
  /**
   * Emite um evento com o elemento que o usuario quer editar
   * @param element
   */
  buttonEditar(element: object): any {
    this.editar.emit(element);
  }

  buttonExlcuir(index: any): any {
    this.dialog.ngOnDestroy();
    const message = `Gostaria de excluir o item selecionado?`;
    const dialogData = new ConfirmDialogModel(this.dialog, 'Confirmar exclusão', message);
    dialogData.montDialog().pipe(filter(x => x === true)).subscribe((x) => {
      this.dataSource.delete(index).subscribe(
        () => { },
        () => { },
        () => { this.loadTodosPage(); });
    });
  }
}

