
export interface BaseImplements {
    id: number;
    dateCreated: Date;
    dateModified: Date;
}

export interface PaginationResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface PageManipulation {
  totalPages: number;
  pageNumber: number;
  size: number;
}


