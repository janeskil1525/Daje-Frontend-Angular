import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TableObjectGUIService {
  private subject = new Subject<any>();  
  private node: any;
  isVisible:boolean = true;

  getObjectData() {
    return this.node
  }

  setObjectData(node: any) {
    this.node = node;
  }

  sendClickEvent(tools_object_tables_pkey:number, visibility: boolean, node: any = {}) {
    this.setVisibility(visibility);
    this.node = node;
    this.subject.next(tools_object_tables_pkey);
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
