import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableObjectService {
  private subject = new Subject<any>();
  
  private objectData: any;

  getObjectnData() {
    return this.objectData
  }

  sendClickEvent(data:any) {
    this.objectData = data;
    this.subject.next(data);
  }

  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
