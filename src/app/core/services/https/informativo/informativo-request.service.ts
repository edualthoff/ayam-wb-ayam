import { InformativoDto } from '../../../interfaces/informativo.dto';
import { PaginationResponse } from './../../../../core/modals/base.modal';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformativoRequestService {

  private URIDESTINO = 'informativo';

  constructor(protected http: HttpClient) {  }

  save(caract: InformativoDto): any {
    return this.http.post(`/adm/${this.URIDESTINO}`, caract);
  }

  saveAndFile(informativo: InformativoDto, file: File[]): Observable<any> {
    const myheader = new HttpHeaders().set('Accept', 'application/json');
    const f = new FormData();
    f.append('informativo', JSON.stringify(informativo));
    file.forEach( (x: File) => {
      f.append('file', x);
    });
    return this.http.post(`/adm/${this.URIDESTINO}`, f, {
      headers: myheader,
      reportProgress: true,
      responseType: 'json'
    });
  }
  updateAndFile(informativo: InformativoDto, file: File[]): Observable<any> {
    const myheader = new HttpHeaders().set('Accept', 'application/json');
    const f = new FormData();
    f.append('informativo', JSON.stringify(informativo));
    file.forEach( (x: File) => {
        f.append('file', x);
    });
    return this.http.put(`/adm/${this.URIDESTINO}`, f, {
      headers: myheader,
      reportProgress: true,
      responseType: 'json'
    });
  }

  update(caract: InformativoDto): any {
    return this.http.put(`/adm/${this.URIDESTINO}`, caract);
  }

  findParameterNameOrAll(nome = '', sort = 'asc', page = 0, size = 10, tipo = '', statusValue? ):
   Observable<PaginationResponse<InformativoDto>> {
    const params2 = new HttpParams()
    .set('nome', nome)
    .set('tipo', tipo)
    // .set('getFile', true)
    .set('sort', sort)
    .set('page', page.toString())
    .set('size', size.toString());
    if (statusValue != null) {
      params2.set('status', statusValue);
    }
    return this.http.get<PaginationResponse<InformativoDto>>(`/adm/${this.URIDESTINO}/autosuggest`, { params: params2 });
  }

  findById(infoId: number): Observable<InformativoDto> {
    return this.http.get<InformativoDto>(`/${this.URIDESTINO}/${infoId}`);
  }

  delete(index: number): any {
    return this.http.delete(`/${this.URIDESTINO}/${index}`);
  }
}
