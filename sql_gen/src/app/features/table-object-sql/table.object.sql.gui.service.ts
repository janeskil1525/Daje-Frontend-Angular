import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableObjectSqlGuiService {
  isVisible:boolean = true;
  node:any;
  private subject = new Subject<any>();

  sendClickEvent(tools_object_index_pkey:any, visibility: boolean, node: any = {}) {
    this.setVisibility(visibility);
    this.node = node;
    this.subject.next(tools_object_index_pkey);
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
