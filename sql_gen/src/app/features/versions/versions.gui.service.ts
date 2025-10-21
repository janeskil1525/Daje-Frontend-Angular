import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionsGuiService {
  isVisible:boolean = true;
  node:any;
  private subject = new Subject<any>();

  sendClickEvent(tools_version_pkey:any, visibility: boolean, node: any = {}) {
    this.setVisibility(visibility);
    this.node = node;
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
