import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ObjectGuiService {
  private subject = new Subject<any>();
  private node: any;
  private object_type:number = 0;
  isVisible:boolean = true;

  getVersionData() {
    return this.node
  }

  sendClickEvent(
    tools_objects_pkey:number, visibility:boolean, node:any = {}, object_type:number = 0
  ) {
    this.setVisibility(visibility);
    this.node = node;
    this.subject.next(tools_objects_pkey);
    this.object_type = object_type;
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

  getObjectType() {
    return this.object_type;
  }
}
