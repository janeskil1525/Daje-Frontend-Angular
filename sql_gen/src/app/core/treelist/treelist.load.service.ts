import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class TreelistLoadService {

  private subject = new Subject<any>();
  
  sendClickEvent(tools_projects_pkey: number) {
    this.subject.next(tools_projects_pkey);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}