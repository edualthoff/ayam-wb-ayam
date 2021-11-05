import { CaracteristicaProdutoDto } from './../../../../core/interfaces/caracteristica.interface';
import { IconPathSVG } from './../../../../core/interfaces/icon-path.interface';
import { ListIconDialogModel } from './../../../../shared/components/list-icon/list-icon.component';
import { CaracteristicaRequestService } from './../../../../core/services/https/caracteristica/caracteristica-request.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-caracteristicas-crud',
  templateUrl: './caracteristicas-crud.component.html',
  styleUrls: ['./caracteristicas-crud.component.scss']
})
export class CaracteristicasCrudComponent implements OnInit {
  titulo = 'Adicionar Caracteristica';
  buttonName = 'Salvar';

  reactiveForm: FormGroup;
  private caracteristica: CaracteristicaProdutoDto = {} as CaracteristicaProdutoDto;
  private iconPathSVG = {} as IconPathSVG;

  constructor(private caracteristicaProdutoService: CaracteristicaRequestService, private fb: FormBuilder, public dialog: MatDialog,
              private activedRoute: ActivatedRoute, private router: Router, private http: CaracteristicaRequestService) {
    this.mountForm();
  }

  ngOnInit(): void {
    this.reactiveForm.get(['status']).setValue(false);
    if (this.activedRoute.snapshot.params['idCaracteristica'] !== undefined) {
      this.titulo = 'Editar Caracteristica';
      this.buttonName = 'Atualizar';
      this.http.findById(this.activedRoute.snapshot.params['idCaracteristica']).pipe(debounceTime(200))
        .subscribe((result: CaracteristicaProdutoDto) => {
          this.iconPathSVG.name = result.fontIcon;
          this.iconPathSVG.url = result.pathUrlIcon;
          this.iconPathSVG.pathRelative = result.pathRelativeIcon;
          const fr = {
            id: result.id,
            nome: result.nome,
            fontIcon: this.iconPathSVG,
            tipo: result.tipo,
            contentDescricao: result.descricao,
            status: result.status,
          };
          this.reactiveForm.setValue(fr);
          this.reactiveForm.get(['status']).setValue(result.status);
        });
    }
  }

  private mountForm(): any {
    this.reactiveForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required]],
      fontIcon: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      contentDescricao: [''],
      status: ['', [Validators.required]],
    });
  }

  /** Button que abre o dialog com os icones e retorna o selecionado */
  buttonAddIcon() {
    this.dialog.ngOnDestroy();
    const listDialog = new ListIconDialogModel(this.dialog);
    const iconSelect = listDialog.montDialog();
    iconSelect.subscribe(x => {
      this.reactiveForm.get(['fontIcon']).setValue(x);
    });
  }
  /**
   * Atualizar ou Inserir uma Caracteristica
   * @returns
   */
  buttonSaveAndUpdate(): any {
    // Set icon parametros
    this.iconPathSVG = this.reactiveForm.get(['fontIcon']).value;
    this.caracteristica.fontIcon = this.iconPathSVG.name;
    this.caracteristica.pathUrlIcon = this.iconPathSVG.url;
    this.caracteristica.pathRelativeIcon = this.iconPathSVG.pathRelative;

    this.caracteristica.id = this.reactiveForm.get(['id']).value;
    this.caracteristica.nome = this.reactiveForm.get(['nome']).value;
    this.caracteristica.tipo = this.reactiveForm.get(['tipo']).value;
    this.caracteristica.descricao = this.reactiveForm.get(['contentDescricao']).value;
    this.caracteristica.status = this.reactiveForm.get(['status']).value;

    switch (this.buttonName) {
      case 'Salvar':
        return this.caracteristicaProdutoService.save(this.caracteristica).pipe(tap(() => {
          this.router.navigate(['../'], {relativeTo: this.activedRoute}); })).subscribe();
      case 'Atualizar':
        return this.caracteristicaProdutoService.update(this.caracteristica).pipe(tap(() => {
          this.router.navigate(['../'], {relativeTo: this.activedRoute}); })).subscribe();
      default:
        break;
    }
  }
}
