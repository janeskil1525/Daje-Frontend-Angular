import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { ProjectsInterface } from './projects.interface';
import { Observable }  from 'rxjs';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {
  private data: any[] = [];
  private localkey: string = '';

  private http = inject(HttpClient);

  constructor(private localstorage: LocalStorageService) {}

   getData(): Observable<ProjectsInterface[]> {
    this.localkey = this.localstorage.getItem('X-Token-Check')!;

    return this.http.get<ProjectsInterface[]>('http://localhost/tools/api/v1/tools/projects',{
      headers:{
        'X-Token-Check': this.localkey
        //''
      }
    });

  }



}
