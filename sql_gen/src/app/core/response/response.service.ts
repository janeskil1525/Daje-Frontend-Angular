import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ResponseInterface } from './response.interface';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  
  private subject = new Subject<any>();

  sendResponse(response: any) {
    this.subject.next(response);
  }
  getResponse(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
