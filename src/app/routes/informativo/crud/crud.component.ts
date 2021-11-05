import { InformativoRequestService } from './../../../core/services/https/informativo/informativo-request.service';
import { FileUploadUpdate } from './../../../shared/file-upload/service/file-upload.dto';
import { InformativoDto } from '../../../core/interfaces/informativo.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  titulo = 'Adicionar Informativo';
  buttonName = 'Salvar';

  reactiveForm: FormGroup;
  private informativoRec: InformativoDto = {} as InformativoDto;

  constructor(private fb: FormBuilder, private activedRoute: ActivatedRoute, private router: Router,
              private http: InformativoRequestService) { }

  ngOnInit(): void {
    this.mountForm();
    this.reactiveForm.get(['destacar']).setValue(false);
    this.reactiveForm.get(['status']).setValue(false);
    if (this.activedRoute.snapshot.params['id'] !== undefined) {
      this.titulo = 'Editar Cristal';
      this.buttonName = 'Atualizar';
      this.http.findById(this.activedRoute.snapshot.params['id']).pipe(debounceTime(200))
        .subscribe((result: InformativoDto) => {
          this.informativoRec = result;
          const fr = {
            id: result.id,
            titulo: result.titulo,
            subTitulo: result.subTitulo,
            textoCurto: result.textoCurto,
            uploadFile: [...result.uploadFile],
            corpoMensagem: result.corpoMensagem,
            destacar: result.destacar,
            status: result.status,
            tipo: result.tipo
          };
          this.reactiveForm.setValue(fr);
          this.reactiveForm.get(['destacar']).setValue(result.destacar);
          this.reactiveForm.get(['status']).setValue(result.status);
        });
    }
  }

  private mountForm(): any {
    this.reactiveForm = this.fb.group({
      id: [''],
      titulo: ['', [Validators.required]],
      subTitulo: [''],
      textoCurto: [''],
      destacar: ['', [Validators.required]],
      status: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      corpoMensagem: ['', Validators.required],
      uploadFile: ['', Validators.required],
    });
  }

 /**
   * Atualizar ou Inserir um Informativo
   * @returns
   */
  buttonSaveAndUpdate(): any {
    const informativoDto = {} as InformativoDto;
    informativoDto.uploadFile = [];
    informativoDto.id = this.reactiveForm.get(['id']).value;
    informativoDto.titulo = this.reactiveForm.get(['titulo']).value;
    informativoDto.subTitulo = this.reactiveForm.get(['subTitulo']).value;
    informativoDto.destacar = this.reactiveForm.get(['destacar']).value;
    informativoDto.status = this.reactiveForm.get(['status']).value;
    informativoDto.tipo = this.reactiveForm.get(['tipo']).value;
    informativoDto.textoCurto = this.reactiveForm.get(['textoCurto']).value;
    informativoDto.corpoMensagem = this.reactiveForm.get(['corpoMensagem']).value;
    // informativoDto.uploadFile = this.reactiveForm.get(['uploadFile']).value;
    const filesNews: File[] = this.reactiveForm.get(['uploadFile']).value;
    // console.log("tt "+JSON.stringify(this.reactiveForm.get(['corpoMensagem']).value));
    switch (this.buttonName) {
      case 'Salvar':
        return this.http.saveAndFile(informativoDto, filesNews).pipe(tap(() => {
         this.router.navigate(['../'], {relativeTo: this.activedRoute}); })).subscribe();
      case 'Atualizar':
        const ff = new FileUploadUpdate(this.informativoRec.uploadFile, filesNews);
        // console.log("up "+ JSON.stringify(ff.fileUploadNews))
        informativoDto.uploadFile.push(...ff.fileUploadNews);
        return this.http.updateAndFile(informativoDto, ff.fileNews).pipe(tap(() => {
          this.router.navigate(['../'], {relativeTo: this.activedRoute}); })).subscribe();
      default:
        break;
    }
  }
}
