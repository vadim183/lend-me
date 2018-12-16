import { injectable } from 'inversify';
import { from, Observable } from 'rxjs';

import fetch from 'node-fetch';

@injectable()
export class HttpClient {
  public get<TResult>(url: string): Observable<TResult> {
    return from(
      fetch(url)
        .then(reponse => {
          return reponse.json();
        })
        .catch((reason: any) => {
          throw new Error(reason);
        })
    );
  }
}
