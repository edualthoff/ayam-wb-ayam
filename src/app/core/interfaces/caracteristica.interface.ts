export interface CaracteristicaProdutoDto {

  id: number;
  nome: string;
  descricao: string;
  tipo?: 'elemento' | 'vibracao';
  status: boolean;
  fontIcon: string;
  pathUrlIcon: string;
  pathRelativeIcon: string;
}
