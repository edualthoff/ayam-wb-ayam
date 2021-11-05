import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor  {

  /* Ex: file_extension|audio/*|video/*|image/*|media_type"
     Padrao imagens /.jpg, .pjpg, .jpeg, .pjpeg, .png, .bmp
  */
  @Input() requiredFileType: string;
  @Input() uniqueFile: boolean;
  @Input() inputName: string;

  private onChanged = (_: any) => {};
  private onTouched = () => {};

  constructor(private host: ElementRef<HTMLInputElement>) { }

  ngOnInit(): void {
    this.requiredFileType = '.jpg, .pjpg, .jpeg, .pjpeg, .png, .bmp';
    this.uniqueFile = true;
  }
/*
  onFileSelected(event): void {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.files.item(1).
      this.files.append(this.fileName, file);
      this.onChange(this.files);

    }
  }*/
  private _filesInput: File[];

  get filesInput(): File[] {
    return this._filesInput;
  }
  set filesInput(value: any) {
    if (this._filesInput !== value) {
      this._filesInput = value;
      this.onChanged(value);
    }
  }

  onFileSelected(event): void {
    const file: File = event.target.files[0];
    if (file) {
      if ( this.uniqueFile && (this.filesInput.length < 1)) {
        this.filesInput.push(file);
        //this.onChanged(this.filesInput);
      }
      if (!this.uniqueFile) {
        this.filesInput.push(file);
        //this.onChanged(this.filesInput);
      }
    }
  }

  removerFile(i: number): void {
    delete this.filesInput[i];
    this.onChanged(this.filesInput);
  }

  viewFile(i: number): void {
    console.log("log url "+this.filesInput[i].size);
    if (this.filesInput[i].size !== undefined) {
      const url = window.URL.createObjectURL(this.filesInput[i]);
      window.open(url);
    }
    console.log("log url ");
  }

  writeValue( obj: File[] ): any {
    // clear file input
    this.host.nativeElement.value = '';
    if (obj.length !== 0) {
      this.filesInput = obj;
    } else {
      this.filesInput = [];
    }
  }

  registerOnChange( fn: any ): any {
    this.onChanged = fn;
  }

  registerOnTouched( fn: any ): any {
    this.onTouched = fn;
  }

  trackByMethod(index: number, el: any): any {
    return index;
  }
}
