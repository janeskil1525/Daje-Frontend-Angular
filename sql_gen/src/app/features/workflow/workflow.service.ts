import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class WorkflowService {

    private localkey: string = '';
    constructor(
      private  localstorage: LocalStorageService
    ) {}  

    private http = inject(HttpClient);
    
  
     execute(data: any) {
        this.localkey = this.localstorage.getItem('X-Token-Check')!;
        return this.http.put(`http://localhost/tools/api/v1/workflow/execute`, 
           data, { headers:{
          'X-Token-Check': this.localkey
        }});
      }
    //this.data.push(newData);
}

