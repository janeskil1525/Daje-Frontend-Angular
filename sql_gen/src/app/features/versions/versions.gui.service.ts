import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionsGuiService {

  private subject = new Subject<any>();

  sendClickEvent(tools_version_pkey:any) {
    this.subject.next(tools_version_pkey);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
