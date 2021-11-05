import { Component, ElementRef, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editor-texto',
  templateUrl: './editor-texto.component.html',
  styleUrls: ['./editor-texto.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EditorTextoComponent),
    },
  ]
})
export class EditorTextoComponent implements ControlValueAccessor  {
  config: AngularEditorConfig = {
    spellcheck: true,
    height: 'auto',
    minHeight: '5rem',
    maxHeight: '100%',
    width: 'auto',
    minWidth: '0',
    enableToolbar: true,
    showToolbar: true,
    editable: true,
    sanitize: false,
    placeholder: 'Informe o texto...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadWithCredentials: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'fontSize',
        'insertImage',
        'insertVideo',
      ]
    ]
  };

  constructor() { }

  validVerify: boolean;
  private onTouched = () => { };
  private onChanged = (_: any) => { };
  disabled: boolean;

  private _value: any;

  get value() {
    return this._value;
  }

  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      this.onChanged(value);
    }
  }

  public onInputBlur(): void {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
