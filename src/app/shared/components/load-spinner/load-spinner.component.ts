import { Component, Input, OnInit } from '@angular/core';
import { LoadSpinnerService } from './load-spinner.service';

@Component({
  selector: 'app-load-spinner',
  template: `
  <mat-spinner *ngIf="loading$ | async" class="internal-spinner" [diameter]="diameter"></mat-spinner>
  `,
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent implements OnInit {

  loading$ = this.loader.loading$;
  @Input() show: boolean;
  @Input() diameter = 20;

  constructor(public loader: LoadSpinnerService) {}


  ngOnInit(): any {
    if (this.show) {
      this.loader.showHide(this.show);
    }
  }
}
