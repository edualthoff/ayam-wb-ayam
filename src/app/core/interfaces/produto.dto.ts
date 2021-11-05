import { CaracteristicaProdutoDto } from './caracteristica.interface';
import { FileUploadDto } from '../../shared/file-upload/service/file-upload.dto';

export interface ProdutoDto {
  id: number;
  nome: string;
  nomeCurto: string;
  descricao: string;
  listCaracteristicaProduto: CaracteristicaProdutoDto[];
  uploadFile: FileUploadDto[];
  status: boolean;
}



export class ProdutoModal implements ProdutoDto {
  id: number;
  nome: string;
  nomeCurto: string;
  descricao: string;
  listCaracteristicaProduto: CaracteristicaProdutoDto[];
  uploadFile: FileUploadDto[];
  status: boolean;

  constructor(prod: ProdutoDto) {
    Object.assign(this, prod);
  }

}
