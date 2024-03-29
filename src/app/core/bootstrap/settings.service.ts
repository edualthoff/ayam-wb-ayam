import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private options = defaults;

  get notify(): Observable<any> {
    return this.notify$.asObservable();
  }

  private notify$ = new BehaviorSubject<any>({});

  setOptions(options: AppSettings): any  {
    this.options = Object.assign(defaults, options);
    this.notify$.next(this.options);
  }

  getOptions(): AppSettings {
    return this.options;
  }

  get language(): any  {
    return this.options.language;
  }

  setLanguage(lang: string): any  {
    this.options.language = lang;
    this.notify$.next({ lang });
  }
}
