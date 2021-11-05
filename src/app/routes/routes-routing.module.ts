import { AdminLayoutComponent } from './../theme/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: '', component: HomeComponent, },
    { path: 'produto', loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule) },
    { path: 'informativo', loadChildren: () => import('./informativo/informativo.module').then(m => m.InformativoModule) },
    { path: '**', redirectTo: '' },
  ]},
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
