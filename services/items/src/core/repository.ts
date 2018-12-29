import { Observable } from 'rxjs';

export interface Repository<T> {
  getAll(): Observable<T[]>;
  get(id: any): Observable<T>;
}
