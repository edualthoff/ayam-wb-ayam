import { Type } from "@angular/core";

export interface AdItemPreviewComponent {
  data: any;
}


export class AdItemPreview {
  constructor(public component: Type<any>, public data: any) {}
}
