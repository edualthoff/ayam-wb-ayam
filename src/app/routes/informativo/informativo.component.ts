import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outlet-informativo',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./informativo.component.scss']
})
export class InformativoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
