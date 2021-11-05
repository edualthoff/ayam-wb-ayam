import { ProdutoDto } from '../../../interfaces/produto.dto';
import { PaginationResponse } from './../../../../core/modals/base.modal';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoRequestService {

  constructor(protected http: HttpClient) {  }

  save(produtoDto: ProdutoDto): any {
    return this.http.post('/produto', produtoDto);
  }

  saveAndFile(produtoDto: ProdutoDto, file: File[]): Observable<any> {
    const myheader = new HttpHeaders().set('Accept', 'application/json');
    const f = new FormData();
    f.append('produto', JSON.stringify(produtoDto));
    file.forEach( (x: File) => {
      f.append('file', x);
    });
    return this.http.post('/produto', f, {
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
    return this.http.put('/produto', f, {
      headers: myheader,
      reportProgress: true,
      responseType: 'json'
    });
  }

  getAllPage(page = 0, size = 10): Observable<PaginationResponse<ProdutoDto>>  {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<PaginationResponse<ProdutoDto>>('/produto/todos', { params });
  }

  findParameterNameOrAll(nome = '', page = 0, size = 10,  sort = 'asc'): Observable<PaginationResponse<ProdutoDto>>  {
    const params2 = new HttpParams()
    .set('nome', nome)
    .set('sort', sort)
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<PaginationResponse<ProdutoDto>>('/produto/autosuggest', { params: params2 });
  }

  findById(idProd: string): Observable<ProdutoDto> {
    return this.http.get<ProdutoDto>(`/produto/${idProd}`);
  }
  delete(index: number) {
    return this.http.delete(`/produto/${index}`);
  }
}
