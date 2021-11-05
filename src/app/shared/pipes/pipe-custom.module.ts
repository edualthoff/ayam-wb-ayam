import { SimNaoPipe } from './sim-nao/sim-nao.pipe';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';
import { SafePipe } from './safe/safe.pipe';



@NgModule({
  declarations: [
    SimNaoPipe,
    SafeHtmlPipe,
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimNaoPipe,
    SafeHtmlPipe,
    SafePipe
  ]
})
export class PipeCustomModule {
  static forRoot(): ModuleWithProviders<PipeCustomModule> {
    return {
      ngModule: PipeCustomModule,
    };
  }
}
