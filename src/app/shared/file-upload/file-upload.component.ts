import { LoadFileService } from './service/load-file.service';
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator, NG_VALIDATORS, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor, Validator {

  /* Ex: file_extension|audio/*|video/*|image/*|media_type"
     Padrao imagens /.jpg, .pjpg, .jpeg, .pjpeg, .png, .bmp
  */
  @Input() requiredFileType = 'image/jpg,image/pjpg,image/jpeg,image/pjpeg,image/png,image/bmp';
  @Input() uniqueFile: boolean;
  @Input() inputName: string;
  @Input()
  get fileValue(): File[] {
    return this._filesInput;
  }
  set fileValue(file: File[]){
    if (this._filesInput !== file) {
      this._filesInput = file;
    }
  }

  @Output() fileValueChange: EventEmitter<File[]> = new EventEmitter();

  private verifyValidated = false;
  private onChanged = (_: File[]) => { };
  private onTouched = () => { };
  private _filesInput: File[] = [];


  constructor(private host: ElementRef<HTMLInputElement>, private loadFileService: LoadFileService) { }

  ngOnInit(): void {
    this.uniqueFile = true;
  }

  onFileSelected(event): void {
    const file: File = event.target.files[0];
    console.log("aqui set 44 "+this._filesInput.length)

    if (file) {
      if (this._filesInput.length === 0) {
        this._filesInput = [];
      }
      if (this.uniqueFile && (this._filesInput.length < 1)) {
        this._filesInput.push(file);
        this.onChanged(this.fileValue);
        this.fileValueChange.emit(this.fileValue);
      }
      if (!this.uniqueFile) {
        this._filesInput.push(file);
        this.onChanged(this.fileValue);
        this.fileValueChange.emit(this.fileValue);
      }
    }
  }

  removerFile(i: number): void {
    this._filesInput.splice(i, 1);
    this.onChanged(this.fileValue);
  }

  viewFile(item: any, i: number): void {
    if (this.fileValue[i].size !== undefined) {
      this.loadFileService.downloadFileFront(item.name, this.fileValue[i].slice());
    } else {
      this.loadFileService.load(item.pathUrl);
    }
  }

  writeValue(obj: File[]): any {
    // clear file input
    this.host.nativeElement.value = '';
    this._filesInput = obj;
  }

  registerOnChange(fn: any): any {
    this.onChanged = fn;

  }

  registerOnTouched(fn: any): any {
    this.onTouched = fn;

  }

  trackByMethod(index: number, el: any): any {
    return index;
  }

  /** Implementa a funcao Validate do FormControl */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileValue.length !== undefined && control.hasValidator(Validators.required) && this.fileValue.length === 0) {
      this.verifyValidated = true;
      return control.value;
    } else {
      return null;
    }
  }
}
