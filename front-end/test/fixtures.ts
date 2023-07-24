import { Page } from '../src/types';

export function emptyPage<T>(): Page<T> {
  return {
    content: [],
    last: true,
    first: true,
    totalElements: 0,
    totalPages: 0,
    size: 10,
    number: 1
  };
}
