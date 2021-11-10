import { ProdutoDto } from '../../../interfaces/produto.dto';
import { PaginationResponse } from './../../../../core/modals/base.modal';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoRequestService {

  private URIDESTINO = 'produto';

  constructor(protected http: HttpClient) {  }

  save(produtoDto: ProdutoDto): any {
    return this.http.post(`/adm/${this.URIDESTINO}`, produtoDto);
  }

  saveAndFile(produtoDto: ProdutoDto, file: File[]): Observable<any> {
    const myheader = new HttpHeaders().set('Accept', 'application/json');
    const f = new FormData();
    f.append('produto', JSON.stringify(produtoDto));
    file.forEach( (x: File) => {
      f.append('file', x);
    });
    return this.http.post(`/adm/${this.URIDESTINO}`, f, {
      headers: myheader,
      reportProgress: true,
      responseType: 'json'
    });
  }

  updateAndFile(produtoDto: ProdutoDto, file: File[]): Observable<any> {
    const myheader = new HttpHeaders().set('Accept', 'application/json');
    const f = new FormData();
    f.append('produto', JSON.stringify(produtoDto));
    file.forEach( (x: File) => {
        f.append('file', x);
    });
    return this.http.put(`/adm/${this.URIDESTINO}`, f, {
      headers: myheader,
      reportProgress: true,
      responseType: 'json'
    });
  }

  getAllPage(page = 0, size = 10): Observable<PaginationResponse<ProdutoDto>>  {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<PaginationResponse<ProdutoDto>>(`/adm/${this.URIDESTINO}/todos`, { params });
  }

  findParameterNameOrAll(nome = '', page = 0, size = 10,  sort = 'asc'): Observable<PaginationResponse<ProdutoDto>>  {
    const params2 = new HttpParams()
    .set('nome', nome)
    .set('sort', sort)
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<PaginationResponse<ProdutoDto>>(`/adm/${this.URIDESTINO}/autosuggest`, { params: params2 });
  }

  findById(idProd: string): Observable<ProdutoDto> {
    return this.http.get<ProdutoDto>(`/${this.URIDESTINO}/${idProd}`);
  }
  delete(index: number) {
    return this.http.delete(`/adm/${this.URIDESTINO}/${index}`);
  }
}
