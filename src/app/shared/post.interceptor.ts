import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.service';

@Injectable()
export class PostInterceptor implements HttpInterceptor  {

  constructor() { }

  intercept(req: HttpRequest<Post>, next: HttpHandler): Observable<HttpEvent<Post>> {
    if (req.method === 'POST') {
      const date = new Date().getTime();

      const modifiedBody = {...req.body, date};
      const modifiedReq = req.clone({
        headers: req.headers.set('Req-Date', date.toString()),
        body: modifiedBody
      })

      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }

}
