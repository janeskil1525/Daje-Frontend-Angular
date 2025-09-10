import { Injectable, inject } from '@angular/core';
import { Observable }  from 'rxjs';
import { ToolsMenulist } from './menulist.interface';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenulistService {
   private data: any[] = [];
  
    private http = inject(HttpClient);
  
     getData(tools_projects_pkey: number): Observable<ToolsMenulist[]> {
  
      return this.http.get<ToolsMenulist[]>('http://localhost/tools/api/v1/tools/trelist');
  
    }
}
