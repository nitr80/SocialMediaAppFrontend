export interface PagedList<T> {
  values: T[];
  cursor: string | null;
}
