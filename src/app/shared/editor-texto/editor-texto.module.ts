import { EditorTextoDirective } from './editor-texto.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorTextoComponent } from './editor-texto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    EditorTextoComponent,
    EditorTextoDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule
  ],
  exports: [
    EditorTextoComponent,
    EditorTextoDirective
  ]
})
export class EditorTextoModule { }
