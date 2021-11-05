import { CaracteristicaProdutoDto } from './../../../../core/interfaces/caracteristica.interface';
import { CaracteristicaRequestService } from './../../../../core/services/https/caracteristica/caracteristica-request.service';
import { PaginationResponse } from './../../../../core/modals/base.modal';
import { Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DatasourceTable } from 'src/app/shared/table-pagination/services/datasource-table';

@Injectable()
export class CaracteristicaTableService extends DatasourceTable<CaracteristicaProdutoDto> {

  constructor(private caracteristicaRequestService: CaracteristicaRequestService) {
    super();
  }

  load(keyboard, sort, pageIndex, pageSize) {
    this.loadingSubject.next(true);
    this.caracteristicaRequestService.findParameterNameOrAll(keyboard, sort, pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((x: PaginationResponse<CaracteristicaProdutoDto>) => {
      this.valuesSubject.next(x.content);
      this.totalElements$ = x.totalElements;
    });
  }

  delete(index: number): Observable<object> {
    return this.caracteristicaRequestService.delete(index);
  }
}
