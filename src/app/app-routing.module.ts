import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule) },
  { path: 'informativo', loadChildren: () => import('./routes/informativo/informativo.module').then(m => m.InformativoModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: environment.useHash,
      enableTracing: true,
      relativeLinkResolution: 'corrected',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
