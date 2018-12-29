import { Schema, Model, model } from 'mongoose';
import { Observable, Observer } from 'rxjs';

import { Repository } from '../repository';

export class CollectionAdapter<T> implements Repository<T> {
  private readonly model: Model<any>;

  constructor(name: string, schema: Schema) {
    this.model = model(name, schema);
  }

  getAll(): Observable<T[]> {
    return Observable.create((observer: Observer<T[]>) => {
      this.model.find((error: Error, result: T[]) => {
        if (error) {
          observer.error(error);
        } else {
          observer.next(result);
        }
        observer.complete();
      });
    });
  }

  get(id: any): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this.model.findOne({ id }, (error: Error, result: T) => {
        if (error) {
          observer.error(error);
        } else {
          observer.next(result);
        }
        observer.complete();
      });
    });
  }
}
