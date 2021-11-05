
/**
 * Interaface com os parametros de retorno do Back End - Retorno dos Erros de requisicao
 */
export interface ApiBackEndError {
  uniqueId: string;
  apiVersion: string;
  code: string;
  message: string;
  reasonMessage: string;
  domain: string;
  messageReport: string;
  data: string;

}
