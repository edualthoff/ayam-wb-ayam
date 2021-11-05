import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simNao'
})
export class SimNaoPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case true:
        return 'sim';
      case false:
        return 'não';
      case 'true':
        return 'sim';
      case 'false':
        return 'não';
      default:
        return value;
    }
  }

}
