import { FileRequestService } from './../../../core/services/https/file-upload/file-request.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class LoadFileService {

  constructor(private fileRequestService: FileRequestService) { }

  /** Faz o download do arquivo do servidor */
  load(pathName: string): any  {
    return this.fileRequestService.download(pathName).pipe(tap(
      blob => {
        this.downloadFileFront(pathName.split('/').pop(), blob);
      }
    )).subscribe();
  }

  /** Converte o Blob para ser baixado no Front */
  downloadFileFront(pathName: string, blob: Blob): any {
    const reader  = new File([blob], pathName);
    const objectUrl = URL.createObjectURL(reader);
    const verLink = document.createElement('a');
    verLink.href = objectUrl;
    verLink.download = pathName.split('/').pop();
    verLink.click();
    verLink.remove();
  }
}


