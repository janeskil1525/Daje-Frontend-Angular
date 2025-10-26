import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class TreelistLoadService {

  private subject = new Subject<any>();
  private tools_projects_pkey: number = 0;

  sendClickEvent(tools_projects_pkey: number) {
    this.tools_projects_pkey = tools_projects_pkey;
    this.subject.next(tools_projects_pkey);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

    getTools_projects_pkey() {
    return this.tools_projects_pkey;
  }
}