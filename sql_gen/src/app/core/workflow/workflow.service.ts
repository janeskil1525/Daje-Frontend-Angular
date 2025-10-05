import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { LocalStorageService } from '../localstorage/local-storage.service';
import { WorkflowIdentificationData } from './workflow.interface';

@Injectable({
  providedIn: 'root'
})

export class WorkflowService {

    private localkey: string = '';
    private connector_data: WorkflowIdentificationData = {connector:"", connector_pkey:0, workflow_pkey:0};

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

      setConnectorData(connector: string, connector_pkey:number, workflow_fkey:number) {
        this.connector_data.connector = connector;
        this.connector_data.connector_pkey = connector_pkey;
        this.connector_data.workflow_pkey = workflow_fkey;
      }

      getConnectorData() {
        return this.connector_data;
      }

    //this.data.push(newData);
}

