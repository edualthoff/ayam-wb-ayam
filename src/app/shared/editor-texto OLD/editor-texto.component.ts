import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators, } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor-texto',
  templateUrl: './editor-texto.component.html',
  styleUrls: ['./editor-texto.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: EditorTextoComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: EditorTextoComponent
    },
  ]
})
export class EditorTextoComponent implements ControlValueAccessor, OnDestroy, Validator {

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Informe o texto...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
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
    ]
  };

  form: FormGroup = this.fb.group({
    editorText: [null, [Validators.required]],
  });

  onTouched: Function = () => {};

  onChangeSubs: Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): any {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any): any {
    const sub = this.form.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: Function): any {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): any {
    if (disabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }

  writeValue(value: any): any {
    if (value) {
      this.form.setValue(value, {emitEvent: false});
    }
  }

  validate(control: AbstractControl): any {

    if (this.form.valid) {
      return null;
    }

    let errors : any = {};

    errors = this.addControlErrors(errors, "editorText");

    return errors;
  }

  addControlErrors(allErrors: any, controlName: string): any {

    const errors = {...allErrors};

    const controlErrors = this.form.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }
}
