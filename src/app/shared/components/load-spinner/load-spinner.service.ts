import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadSpinnerService {

  constructor() { }

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  show(): any {
    this._loading.next(true);
  }

  hide(): any {
    this._loading.next(false);
  }

  showHide(load: boolean): any {
    this._loading.next(load);
  }
}
