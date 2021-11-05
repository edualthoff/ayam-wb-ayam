import { CaracteristicasCrudComponent } from './caracteristica/caracteristicas-crud/caracteristicas-crud.component';
import { OutletProdutoComponent } from './outlet-produto.component';
import { ProdutoCrudComponent } from './produto-dashboard/produto-crud/produto-crud.component';
import { CaracteristicaComponent } from './caracteristica/caracteristica.component';
import { ProdutoDashboardComponent } from './produto-dashboard/produto-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: OutletProdutoComponent, children: [
    { path: 'cristal', component: ProdutoDashboardComponent},
    { path: 'cristal/adicionar', component: ProdutoCrudComponent },
    { path: 'cristal/:id', component: ProdutoCrudComponent },
    { path: 'caracteristica', component: CaracteristicaComponent },
    { path: 'caracteristica/adicionar', component: CaracteristicasCrudComponent },
    { path: 'caracteristica/:idCaracteristica', component: CaracteristicasCrudComponent },
  ]},

  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
