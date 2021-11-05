import { PipeCustomModule } from './../../pipes/pipe-custom.module';
import { LoadSpinnerModule } from './../load-spinner/load-spinner.module';
import { LoadFileIconService } from './load-file-icon.service';
import { FileUploadModule } from './../../file-upload/file-upload.module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListIconComponent } from './list-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const MATDIALOG_MODULE = [
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    ListIconComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ...MATDIALOG_MODULE,
    LoadSpinnerModule,
    PipeCustomModule
  ],
  providers: [LoadFileIconService],
  exports: [ListIconComponent]
})
export class ListIconModule { }
