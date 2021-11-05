import { IconPathSVG } from './../../../interfaces/icon-path.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileRequestService {

  constructor(private http: HttpClient) { }

  download(pathName: string): Observable<Blob> {
    return this.http.get(`/api/upload/files/${pathName}`, {
      responseType: 'blob'
    });
  }

  listIconTipo(iconTipo: string): Observable<IconPathSVG[]> {
    return this.http.get<IconPathSVG[]>(`/api/upload/files/${iconTipo}/icons`);
  }

  saveCustomIcon(file: File): Observable<IconPathSVG> {
    const f = new FormData();
    f.append('file', file);
    return this.http.post<IconPathSVG>(`/api/upload/icon/custom`, f);
  }
}
