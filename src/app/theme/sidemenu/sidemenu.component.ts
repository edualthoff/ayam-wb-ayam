import { MenuService } from './../../core/bootstrap/menu.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import data from '../../core/_files/menu.json';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidemenuComponent implements OnInit {

    // NOTE: Ripple effect make page flashing on mobile
    @Input() ripple = false;

    menu$;
    buildRoute = this.menu.buildRoute;

    constructor(private menu: MenuService) {
      //this.menu.addNamespace(data.menu, 'menu');
      this.menu.set(data.menu);
      this.menu$ = this.menu.getAll();
      //this.menu$.forEach( x => {x.forEach(xx => {console.log(xx.type)}); });
    }

  ngOnInit(): void {
  }

}
