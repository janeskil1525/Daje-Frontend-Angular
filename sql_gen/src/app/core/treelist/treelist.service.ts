import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ResponseInterface } from '../response/response.interface';
import { Observable }  from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TreelistService {
  private data: any[] = [];
  private http = inject(HttpClient);
  
  getData(tools_projects_pkey: number): Observable<ResponseInterface[]> {
  
    return this.http.get<ResponseInterface[]>('http://localhost/tools/api/v1/treelist/' + tools_projects_pkey);
  
  }
}
