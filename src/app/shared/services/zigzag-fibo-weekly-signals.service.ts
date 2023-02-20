import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PagedSignalList } from 'src/app/shared/models/paged-signal-list';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZigzagFiboWeeklySignalsService {
  private _stockQuotesAndIndicatorssUrlBase = environment.udfApiBaseUrl;
  marksType = 'Carlos';

  constructor(private http: HttpClient) {}

  getWeeklyZigZagFibPremiumSignalByDateRange(
    from: string,
    to: string
  ): Observable<PagedSignalList> {
    let params = new HttpParams();
    params = params.append('symbol', 'AAPL');
    const apiRequestUrl = `${this._stockQuotesAndIndicatorssUrlBase}/api/signals/zigzagfibosignalsbydaterange`;
    return this.http.get<PagedSignalList>(apiRequestUrl);
    // return (
    //   this.http.get <
    //   PagedSignalList >>
    //     (apiRequestUrl,
    //     {
    //       params,
    //       observe: 'response',
    //     })

    // );
  }

  getWeeklyZigZagFibPremiumSignalById(
    signalId: number | string
  ): Observable<IZigZagFiboSignal> {
    // let params = new HttpParams();
    // params = params.append('signalid', id);

    const apiRequestUrl = `${this._stockQuotesAndIndicatorssUrlBase}/api/weeklyzigzagfibpremiumsignal/${signalId}`;
    return this.http.get<IZigZagFiboSignal>(apiRequestUrl);
    // return this.http.get<IZigZagFiboSignal>(apiRequestUrl).pipe(
    //   tap((data) => console.log('All Signals: ' + JSON.stringify(data))),
    //   catchError(this.handleError)
    // );
  }

  publishWeeklyZigZagFibPremiumSignals(
    signalsToPublish: IZigZagFiboSignal[]
  ): Observable<any> {
    const signalIdsToPublish = signalsToPublish.map((s) => ({
      id: s.id,
      signalType: s.signalType,
    }));
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('authentication', `${student.token}`);

    // let options = new RequestOptions({ headers: headers });

    let headers = new HttpHeaders().set('content-type', 'application/json');

    const apiRequestUrl = `${this._stockQuotesAndIndicatorssUrlBase}/api/weeklyzigzagfibpremiumsignal`;

    return this.http.put<number>(apiRequestUrl, signalIdsToPublish, {
      headers: headers,
    });
    // return this.http
    //   .put<number>(apiRequestUrl, signalIdsToPublish, {
    //     headers: headers,
    //   })
    //   .pipe(
    //     tap((data) => console.log('Published Signals: ' + data)),
    //     catchError(this.handleError)
    //   );
  }

  private handleError(error: Response) {
    console.error('Error:', error);
    return throwError(error);
  }
}
