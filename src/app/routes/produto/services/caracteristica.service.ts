import { CaracteristicaProdutoDto } from './../../../core/interfaces/caracteristica.interface';
import { CaracteristicaRequestService } from './../../../core/services/https/caracteristica/caracteristica-request.service';
import { PageManipulation, PaginationResponse } from './../../../core/modals/base.modal';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class CaracteristicaService {

  isLoading = false;

  private setPage: Map<string, PageManipulation> = new Map();
  private tipoList: Map<string, CaracteristicaProdutoDto[]> = new Map();

  //private tipo = new BehaviorSubject<tipoList>(null);

  getTipo(tipo: string) {
    return this.tipoList.get(tipo);
  }

  getSetPage(tipo: string) {
    return this.setPage.get(tipo);
  }

  constructor(private caracteristicaRequestService: CaracteristicaRequestService) { }

  mountlistCaracteristicaTipo(tipo: string) {
    const pageManipulation = {} as PageManipulation;
    this.caracteristicaRequestService.getTipoAllPages(pageManipulation.pageNumber = 0, pageManipulation.size = 10, tipo).pipe(
      map((x: PaginationResponse<CaracteristicaProdutoDto>) => {
        pageManipulation.totalPages = undefined ? pageManipulation.totalPages = 1 : pageManipulation.totalPages = x.totalPages;
        pageManipulation.pageNumber === 0 ? pageManipulation.pageNumber = 0 : pageManipulation.pageNumber++;

        this.setPage.set(tipo, pageManipulation);
        this.tipoList.set(tipo, x.content);
      })
    ).subscribe();
  }

}
