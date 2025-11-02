import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ParameterValuesLoadService {

  private subject = new Subject<any>();
  private tools_projects_pkey: number = 0;
  private tools_parameters_pkey: number = 0;
  private isVisible:boolean = false;

  sendClickEvent(tools_projects_pkey: number, tools_parameters_pkey:number, isVisible:boolean) {
    this.setVisibility(isVisible);
    this.tools_parameters_pkey = tools_parameters_pkey;
    this.tools_projects_pkey = tools_projects_pkey;
    this.subject.next(tools_projects_pkey);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

  getTools_projects_pkey() {
    return this.tools_projects_pkey;
  }

  getTools_parameters_pkey(){
    return this.tools_parameters_pkey;
  }

  getVisibility() {
    return this.isVisible;
  }

  setVisibility(visible:boolean = true) {
    this.isVisible = visible;
  }
}