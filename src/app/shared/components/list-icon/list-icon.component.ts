import { ApiBackEndError } from './../../../core/interfaces/api-error.interface';
import { IconPathSVG } from './../../../core/interfaces/icon-path.interface';
import { LoadFileIconService } from './load-file-icon.service';
import { AfterViewInit, Component, Inject, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-icon',
  templateUrl: './list-icon.component.html',
  styleUrls: ['./list-icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListIconComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatTabGroup, {})
  matTabChange: MatTabGroup;

  asyncTabs$: IconPathSVG[] = [];
  selectItem: IconPathSVG = {} as IconPathSVG;
  nameIcon = ['sharp', 'outline', 'filled', 'custom'];
  filesInput: File[] = [];

  private subs: Subscription;
  constructor(public dialogRef: MatDialogRef<ListIconDialogModel>, @Inject(MAT_DIALOG_DATA) public data: ListIconDialogModel,
              public loadFile: LoadFileIconService, private snackBar: MatSnackBar) {

  }
  ngAfterViewInit(): void {
    this.subs = this.matTabChange.selectedIndexChange.subscribe(x => {
      this.loadFile.getIcons(this.matTabChange._allTabs.get(x).textLabel);
    });
    this.matTabChange.selectedIndexChange.next(0);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /** Seleciona o item para ser enviado apos fechar o dialog */
  selectIcon(index: IconPathSVG): any {
    this.selectItem = index;
  }
  /** Salva o icon custom no back e atualiza a lista */
  enviarIcon(file: File[]): any  {
    if (file.length !== 0 ) {
      this.loadFile.enviarValidarIcon(file[0]).subscribe(
        () => { this.loadFile.upadateValueTab('Custom'); },
        (x: ApiBackEndError) => {
          this.snackBar.open(x.reasonMessage, 'Sair', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        () => { this.filesInput = []; },
      );
    }
  }
}


export class ListIconDialogModel {

  constructor(@Inject(MatDialog) private dialog: MatDialog) { }

  /**
   * Retornar um @returns IconPathSVG - com os parametros do icon selecionado
   *
   * @returns Observable<IconPathSVG>
   * @memberof ListIconDialogModel
   */
  public montDialog(): Observable<IconPathSVG> {
    return this.dialog.open(ListIconComponent, {
      minWidth: '300px',
      maxWidth: '700px',
      hasBackdrop: true,
      data: this,
    }).afterClosed();
  }
}
