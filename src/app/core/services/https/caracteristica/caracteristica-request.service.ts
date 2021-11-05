import { CaracteristicaProdutoDto } from './../../../interfaces/caracteristica.interface';
import { PaginationResponse } from './../../../../core/modals/base.modal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaRequestService {

  private URIDESTINO = 'caracteristica';

  constructor(protected http: HttpClient) { }

  /** Salvar */
  save(caract: CaracteristicaProdutoDto): any {
    return this.http.post(`/adm/${this.URIDESTINO}`, caract);
  }
  /** Atualizar */
  update(caract: CaracteristicaProdutoDto): any {
    return this.http.put(`/adm/${this.URIDESTINO}`, caract);
  }
  /** Buscar por todos os ativos @return paginacao */
  getTipoAllPages(page: number = 0, size: number = 10, tipo: string): Observable<PaginationResponse<CaracteristicaProdutoDto>> {
    const params = { page: page.toString(), size: size.toString(), tipo: tipo.toString() };
    return this.http.get<PaginationResponse<CaracteristicaProdutoDto>>(`/${this.URIDESTINO}/status/ativo/pg`, {params});
  }
  /** Buscar Auto sugestiva pelo nome passando a sequencia de caracteris ou retornar todos
   * @param nome
   * @param sort
   * @param page
   * @param size
   * @param status
   * @returns Paginacao
   */
  findParameterNameOrAll(nome = '', sort = 'asc', page = 0, size = 10, status = ''):
    Observable<PaginationResponse<CaracteristicaProdutoDto>>  {
    const params2 = new HttpParams()
    .set('nome', nome)
    .set('sort', sort)
    .set('page', page.toString())
    .set('size', size.toString())
    .set('status', status);
    return this.http.get<PaginationResponse<CaracteristicaProdutoDto>>(`/adm//${this.URIDESTINO}/autosuggest`, { params: params2 });
  }
  /** Buscar por id */
  findById(idCaract: string): Observable<CaracteristicaProdutoDto> {
    return this.http.get<CaracteristicaProdutoDto>(`/${this.URIDESTINO}/${idCaract}`);
  }
  /** deletar por id */
  delete(index: number) {
    return this.http.delete(`/${this.URIDESTINO}/${index}`);
  }
}
