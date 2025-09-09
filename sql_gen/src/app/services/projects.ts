import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { ToolsProjects } from '../interfaces/tools.projects';
import { Observable }  from 'rxjs';
import { LocalStorageService } from './local-storage';

@Injectable({
  providedIn: 'root'
})

export class Projects {
  private data: any[] = [];
  private localkey: string = '';

  private http = inject(HttpClient);

  constructor(private localstorage: LocalStorageService) {}

   getData(): Observable<ToolsProjects[]> {
    this.localkey = this.localstorage.getItem('X-Token-Check')!;

    return this.http.get<ToolsProjects[]>('http://localhost/tools/api/v1/tools/projects',{
      headers:{
        'X-Token-Check': this.localkey
        //''
      }
    });

  }

  addData(project: string, state: string) {
        const params = new HttpParams()
                    .set('project', project)
                    .set('state', state);

    return this.http.put(`http://localhost/tools/api/v1/tools/projects`, { params } )
    //this.data.push(newData);
  }

}
