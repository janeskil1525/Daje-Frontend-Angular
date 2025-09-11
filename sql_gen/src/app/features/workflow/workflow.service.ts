import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
 
    
    private http = inject(HttpClient);

  
     execute(data: any) {

        return this.http.put(`http://localhost/tools/api/v1/workflow/execute`, data )
      }
    //this.data.push(newData);
}

