import { FileUploadDto } from '../../shared/file-upload/service/file-upload.dto';
import { BaseImplements } from '../modals/base.modal';


export interface InformativoDto extends BaseImplements {

  titulo: string;
  subTitulo: string;
  corpoMensagem: string;
  tipo: 'dica' | 'noticia';
  textoCurto: string;
  destacar: boolean;
  status: boolean;
  uploadFile: FileUploadDto[];


}
