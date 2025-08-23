export type PaginatedResponseModel<T> = {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
};

export type PageDataModel = {
  page: number;
  pageSize?: number;
  ordering?: string;
  search?: string;
};
