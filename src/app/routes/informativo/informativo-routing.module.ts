import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { InformativoComponent } from './informativo.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: '', component: InformativoComponent, children: [
    { path: '', component: ListaComponent },
    { path: 'adicionar', component: CrudComponent },
    { path: ':id', component: CrudComponent }
  ]},
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformativoRoutingModule { }
