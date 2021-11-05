import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'value',
})
export class ValuePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  transform(value: any, conversionValue: any): any {
        switch (value) {
      case true:
        return conversionValue.trueName ? conversionValue.trueName : 'sim';
      case false:
        return conversionValue.falseName ? conversionValue.falseName : 'não';
      case 'true':
        return conversionValue.trueName ? conversionValue.trueName : 'sim';
      case 'false':
        return conversionValue.falseName ? conversionValue.falseName : 'não';
      default:
        if (!isNaN(Date.parse(value))) {
          return new DatePipe(this.locale).transform(value, 'dd/MM/yyyy');
        }
        return value;
    }
  }

}
