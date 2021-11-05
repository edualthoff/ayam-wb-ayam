import { InformativoRequestService } from './../../../../core/services/https/informativo/informativo-request.service';
import { PaginationResponse } from './../../../../core/modals/base.modal';
import { InformativoDto } from '../../../../core/interfaces/informativo.dto';
import { Injectable } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DatasourceTable } from 'src/app/shared/table-pagination/services/datasource-table';

@Injectable()
export class ListaTableService extends DatasourceTable<InformativoDto> {

  constructor(private produtoRequestService: InformativoRequestService) {
    super();
  }

  load(keyboard, sort, pageIndex, pageSize) {
    this.loadingSubject.next(true);
    this.produtoRequestService.findParameterNameOrAll(keyboard, sort, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((lessons: PaginationResponse<InformativoDto>) => {
        this.valuesSubject.next(lessons.content);
        this.totalElements$ = lessons.totalElements;
      });
  }

  delete(index: number): Observable<object> {
    return this.produtoRequestService.delete(index);
    // const produtoDto: ProdutoDto[] = this.valuesSubject.getValue();
    // produtoDto.filter(x => x.id = index);
    // this.valuesSubject.next(produtoDto);
  }

}
