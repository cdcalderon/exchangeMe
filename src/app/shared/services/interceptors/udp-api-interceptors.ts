import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';

@Injectable()
export class UdpApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.method === 'GET' &&
      req.url.endsWith('demo_feed.tradingview.com/config')
    ) {
      return of(
        new HttpResponse({
          status: 200,
          statusText: 'OK',
          body: JSON.stringify({
            supports_search: false,
            supports_group_request: false,
            supports_marks: true,
            supports_timescale_marks: true,
            supports_time: true,
            exchanges: [
              { value: '', name: 'Carlos Carlos', desc: '' },
              { value: 'NasdaqNM', name: 'NasdaqNM', desc: 'NasdaqNM' },
              { value: 'NYSE', name: 'NYSE', desc: 'NYSE' },
              { value: 'NCM', name: 'NCM', desc: 'NCM' },
              { value: 'NGM', name: 'NGM', desc: 'NGM' },
            ],
            symbols_types: [
              { name: 'All types', value: '' },
              { name: 'Stock', value: 'stock' },
              { name: 'Index', value: 'index' },
            ],
            supported_resolutions: ['D', '2D', '3D', 'W', '3W', 'M', '6M'],
          }), // A const array with data
        })
      ).pipe(delay(450));
    } else {
      return of(
        new HttpResponse({
          status: 404,
          statusText: 'Not Found',
          body: 'No such endpoint exists!',
        })
      );
    }
  }
}
