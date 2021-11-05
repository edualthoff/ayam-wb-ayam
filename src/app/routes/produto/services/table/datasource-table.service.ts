import { ProdutoRequestService } from './../../../../core/services/https/produto/produto-request.service';
import { DatasourceTable } from 'src/app/shared/table-pagination/services/datasource-table';
import { PaginationResponse } from './../../../../core/modals/base.modal';
import { ProdutoDto } from '../../../../core/interfaces/produto.dto';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, finalize, map } from 'rxjs/operators';

@Injectable()
export class DatasourceTableService extends DatasourceTable<ProdutoDto> {

  constructor(private produtoRequestService: ProdutoRequestService) {
    super();
  }

  load(keyboard, sort, pageIndex, pageSize) {
    this.loadingSubject.next(true);
    this.produtoRequestService.findParameterNameOrAll(keyboard, pageIndex, pageSize, sort).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((lessons: PaginationResponse<ProdutoDto>) => {
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
