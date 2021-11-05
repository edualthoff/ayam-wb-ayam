import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) { }

  /**
    * Transform
    *
    * @param value: string
    * @param type: string
  */
  transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitized.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitized.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitized.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitized.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitized.bypassSecurityTrustResourceUrl(value);
      default:
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
  }

}
