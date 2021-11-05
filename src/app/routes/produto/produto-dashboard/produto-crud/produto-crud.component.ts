import { CaracteristicaProdutoDto } from './../../../../core/interfaces/caracteristica.interface';
import { ProdutoRequestService } from './../../../../core/services/https/produto/produto-request.service';
import { ProdutoModal } from '../../../../core/interfaces/produto.dto';
import { CaracteristicaService } from './../../services/caracteristica.service';
import { ProdutoDto } from '../../../../core/interfaces/produto.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-produto-crud',
  templateUrl: './produto-crud.component.html',
  styleUrls: ['./produto-crud.component.scss']
})
export class ProdutoCrudComponent implements OnInit {
  titulo = 'Adicionar Cristal';
  buttonName = 'Salvar';

  reactiveForm: FormGroup;
  caracteristicaProduto: BehaviorSubject<CaracteristicaProdutoDto>;

  prodRec: ProdutoModal;

  constructor(private form: FormBuilder, public caracteristicaService: CaracteristicaService, private http: ProdutoRequestService,
              private produtoRequestService: ProdutoRequestService, private activedRoute: ActivatedRoute, private route: Location) {
  }

  ngOnInit(): void {
    this.mountForm();
    this.mountlistCaracteristica('elemento');
    this.mountlistCaracteristica('vibracao');
    if (this.activedRoute.snapshot.params['id'] !== undefined) {
      this.titulo = 'Editar Cristal';
      this.buttonName = 'Atualizar';
      this.http.findById(this.activedRoute.snapshot.params['id']).pipe(debounceTime(200))
        .subscribe((result: ProdutoDto) => {
          this.prodRec = new ProdutoModal(result);
          const fr = {
            id: result.id,
            nome: result.nome,
            nomeCurto: result.nomeCurto,
            uploadFile: [...result.uploadFile],
            contentDescricao: result.descricao,
            selectTipoVibracao: result.listCaracteristicaProduto.filter(x => x.tipo.toLowerCase() === 'vibracao'),
            selectTipoElemento: result.listCaracteristicaProduto.filter(x => x.tipo.toLowerCase() === 'elemento'),
          };
          this.reactiveForm.setValue(fr);
        });
    }
  }

  private mountForm(): any {
    this.reactiveForm = this.form.group({
      id: [''],
      nome: ['', [Validators.required]],
      nomeCurto: [''],
      contentDescricao: ['', Validators.required],
      uploadFile: ['', Validators.required],
      selectTipoVibracao: ['', Validators.required],
      selectTipoElemento: ['', Validators.required]
    });
  }

  compareFnElemento(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
  compareFnVibracao(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  buttonSalvar(): any {
    const produtoDto: ProdutoDto = {} as ProdutoDto;
    produtoDto.listCaracteristicaProduto = [];
    produtoDto.uploadFile = [];
    produtoDto.id = this.reactiveForm.get(['id']).value;
    produtoDto.nome = this.reactiveForm.get(['nome']).value;
    produtoDto.nomeCurto = this.reactiveForm.get(['nomeCurto']).value;
    produtoDto.descricao = this.reactiveForm.get(['contentDescricao']).value;
    const filesNews: File[] = this.reactiveForm.get(['uploadFile']).value;

    produtoDto.listCaracteristicaProduto =
      ([...this.reactiveForm.get(['selectTipoVibracao']).value, ...this.reactiveForm.get(['selectTipoElemento']).value]);

    switch (this.buttonName) {
      case 'Salvar':
        return this.produtoRequestService.saveAndFile(produtoDto, filesNews).pipe(tap(() => this.route.back())).subscribe();
      case 'Atualizar':
        this.prodRec.uploadFile.forEach(x => {
          if (filesNews.length !== 0) {
            filesNews.forEach((f, i) => {
              if (f.name === x.name) {
                produtoDto.uploadFile.push(x);
                filesNews.slice(i, 1);
              } else {
                x.remove = true;
                produtoDto.uploadFile.push(x);
              }
            });
          }
        });
        return this.produtoRequestService.updateAndFile(produtoDto, filesNews).pipe(tap(() => this.route.back())).subscribe();
      default:
        break;
    }
  }

  mountlistCaracteristica(tipo: string): any {
    this.caracteristicaService.mountlistCaracteristicaTipo(tipo);
  }
}
