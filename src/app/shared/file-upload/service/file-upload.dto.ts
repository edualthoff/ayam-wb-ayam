
export interface FileUploadDto {
  id: number;
  name: string;
  fileUrl: string;
  pathUrl: string;
  ordem: number;
  height: string;
  width: string;
  dateCreated: Date;
  dateModified: Date;
  remove: boolean;
  // file: File;
}

export class FileUploadUpdate {

  private fileUp: FileUploadDto[] = [];
  private file: File[] = [];

  get fileUploadNews(): FileUploadDto[] {
    return this.fileUp;
  }
  get fileNews(): File[]  {
    return this.file;
  }
  constructor(fileUploadDto: FileUploadDto[], fileNew: File[]) {
    this.marcarFileUploadParaRemover(fileNew, fileUploadDto);
  }

   private marcarFileUploadParaRemover(file: File[], fileUploadDto: FileUploadDto[]): any {
    fileUploadDto.forEach(x => {
      if (file.length !== 0) {
        file.forEach((f, i) => {
          if (f.name === x.name) {
            this.fileUp.push(x);
            file.slice(i, 1);
          } else {
            x.remove = true;
            this.fileUp.push(x);
          }
        });
      }
    });
    this.fileUp.push(...fileUploadDto);
    this.file.push(...file);
  }
}


