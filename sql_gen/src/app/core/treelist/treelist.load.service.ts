import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class TreelistLoadService {

  private subject = new Subject<any>();
  private loc_tools_projects_pkey: number = 0;

  getTools_projects_pkey() {
    return this.loc_tools_projects_pkey;
  }
  sendClickEvent(tools_projects_pkey: number) {
    this.loc_tools_projects_pkey = tools_projects_pkey;
    this.subject.next(tools_projects_pkey);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}