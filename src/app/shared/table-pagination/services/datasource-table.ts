import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export abstract class DatasourceTable<T> implements DataSource<T>, OnDestroy {

  protected valuesSubject = new BehaviorSubject<T[]>([]);
  protected loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalElements$;

  constructor() {}

  ngOnDestroy(): void {
    this.valuesSubject.unsubscribe();
    this.loadingSubject.unsubscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
      return this.valuesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.valuesSubject.complete();
      this.loadingSubject.complete();
  }

  abstract load(keyboard, sort, pageIndex, pageSize): void;
  abstract delete(index: number): Observable<object>;

}
