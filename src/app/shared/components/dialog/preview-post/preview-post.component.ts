import { BreakpointsApp, ViewPortInfo, getBreakpoints } from './../../../utils/viewport';
import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver,  OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AdItemPreview, AdItemPreviewComponent } from './ad-item.component';

@Component({
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PreviewPostComponent implements OnInit, OnDestroy {

  @ViewChild('previewpost', {read: ViewContainerRef, static: true}) template!: ViewContainerRef;
  viewP = [];
  viewPortInfo: ViewPortInfo;
  heighitFix = 115;
  valueColor = '#ffffff';

  constructor(public dialogRef: MatDialogRef<PreviewPostComponent>, private componentFactoryResolver: ComponentFactoryResolver,
              @Inject(MAT_DIALOG_DATA) public data: PreviewDialogModal) {
    this.viewPortInfo = getBreakpoints(this.data.viewport);

  }

  ngOnInit(): void {
    Object.values(BreakpointsApp).filter(x => isNaN(x as any)).map(x => {
      this.viewP.push(x);
    });
    this.template.clear();
    const componentRef = this.template.createComponent<AdItemPreviewComponent>(
      this.componentFactoryResolver.resolveComponentFactory(this.data.adItemPreview.component));
    if (this.data.adItemPreview.data !== null) {
      componentRef.instance.data = this.data.adItemPreview.data;
    }
  }

  ngOnDestroy(): void {
    this.template.remove();
  }

  adjustView(view: any): void  {
    this.viewPortInfo = getBreakpoints(view);
    this.dialogRef.updateSize(`${this.viewPortInfo.width.toString()}px`, `${this.viewPortInfo.height.toString()}px`).updatePosition();
  }

  /** Descontinuado
  getPropertyEnum(view): any {
    return Object.getOwnPropertyDescriptor(BreakpointsApp, view).value;
  } */
}
/**
 * Classe que representa o Preview Dialog.
 *
 * Mounta o Componente Dialog com os parametros informado
 */
export class PreviewDialogModal {

  private vv: ViewPortInfo;

  constructor(@Inject(MatDialog) private dialog: MatDialog, public viewport: BreakpointsApp,
              public adItemPreview: AdItemPreview) {
    this.vv = getBreakpoints(viewport);
  }

  public montDialog(): Observable<boolean> {
  return this.dialog.open(PreviewPostComponent, {
      id: 'previewPost',
      width: `${this.vv.width.toString()}px`,
      height: `${this.vv.height.toString()}px`,
      hasBackdrop: true,
      data: this,
    }).afterClosed();
  }
}


