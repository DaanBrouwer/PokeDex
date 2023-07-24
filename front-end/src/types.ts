export type Page<T> = {
  first: boolean;
  last: boolean;
  number: number;
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
};
