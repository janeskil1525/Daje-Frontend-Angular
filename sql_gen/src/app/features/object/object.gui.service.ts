import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ObjectGuiService {
  private subject = new Subject<any>();
  private versionData: any;

  getVersionData() {
    return this.versionData
  }

  sendClickEvent(data:any) {
    this.versionData = data;
    this.subject.next(data);
  }

  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
