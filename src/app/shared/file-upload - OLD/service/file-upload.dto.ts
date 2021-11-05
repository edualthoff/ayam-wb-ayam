
export interface FileUploadDto {
  id: number;
  name: string;
  url: string;
  pathUrl: string;
  ordem: number;
  height: string;
  width: string;
  dateCreated: Date;
  dateModified: Date;
  remove: boolean;
  file: File;
}

export class FileUpload {
}

