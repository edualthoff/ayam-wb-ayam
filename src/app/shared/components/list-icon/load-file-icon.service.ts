import { LoadSpinnerService } from './../load-spinner/load-spinner.service';
import { IconPathSVG } from './../../../core/interfaces/icon-path.interface';
import { FileRequestService } from './../../../core/services/https/file-upload/file-request.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';


@Injectable()
export class LoadFileIconService {

  private iconList: Map<string, IconPathSVG[]> = new Map<string, IconPathSVG[]>();

  private iconL: BehaviorSubject<IconPathSVG[]> = new BehaviorSubject<IconPathSVG[]>([]);
  get iconL$() {
    return this.iconL;
  }

  constructor(private fileRequestService: FileRequestService, public loadSpinner: LoadSpinnerService) { }

  private load(tipo: string) {
    return this.fileRequestService.listIconTipo(tipo.toLocaleLowerCase());
  }

  getIcons(tipo: string) {
    this.loadSpinner.show();
    if (this.iconList.get(tipo) === undefined) {
      this.load(tipo).subscribe(x => {
        this.iconList.set(tipo, x);
        this.iconL.next(x);
        this.loadSpinner.hide();
      });
    } else {
      this.iconL.next(this.iconList.get(tipo));
      this.loadSpinner.hide();
    }
  }

  enviarValidarIcon(file: File): Observable<IconPathSVG> {
    return this.fileRequestService.saveCustomIcon(file);
  }

  /**
   * Atualiza a lista e realiza uma nova requisicao no servidor
   * @param tipo
   */
  upadateValueTab(tipo: string) {
    this.iconList.delete(tipo);
    this.getIcons(tipo);
  }
}
