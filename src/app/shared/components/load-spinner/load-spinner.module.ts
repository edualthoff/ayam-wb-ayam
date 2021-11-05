import { LoadSpinnerService } from './load-spinner.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadSpinnerComponent } from './load-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    LoadSpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoadSpinnerComponent,
  ],
  providers: [LoadSpinnerService]
})
export class LoadSpinnerModule { }
