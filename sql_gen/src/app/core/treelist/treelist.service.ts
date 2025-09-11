import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ToolsTreelist } from './treelist.interface';
import { Observable }  from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TreelistService {
   private data: any[] = [];
  
    private http = inject(HttpClient);
  
     getData(tools_projects_pkey: number): Observable<ToolsTreelist[]> {
  
      return this.http.get<ToolsTreelist[]>('http://localhost/tools/api/v1/tools/trelist');
  
    }
}
