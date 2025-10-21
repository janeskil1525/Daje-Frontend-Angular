import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ObjectGuiService {
  private subject = new Subject<any>();
  private node: any;
  isVisible:boolean = true;

  getVersionData() {
    return this.node
  }

  sendClickEvent(tools_objects_pkey:number, visibility:boolean, node:any = {}) {
    this.setVisibility(visibility);
    this.node = node;
    this.subject.next(tools_objects_pkey);
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
