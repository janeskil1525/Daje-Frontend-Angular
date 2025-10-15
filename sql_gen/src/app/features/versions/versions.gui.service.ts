import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionsGuiService {

  private subject = new Subject<any>();

  sendClickEvent(data:any) {
    this.subject.next(data);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
