import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionsGuiService {
  isVisible:boolean = true;
  private subject = new Subject<any>();

  sendClickEvent(tools_version_pkey:any) {
    this.subject.next(tools_version_pkey);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

  setVisibility(visible:boolean = true) {
    this.isVisible = visible;
  }

  getVisibility() {
    return this.isVisible;
  }
}
