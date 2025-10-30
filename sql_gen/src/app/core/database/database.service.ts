import { Injectable, inject } from '@angular/core';
import { Observable }  from 'rxjs';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { ResponseInterface } from '../../core/response/response.interface';
import { HttpClient } from '@angular/common/http';
import { EndPoint } from './endpoints';
import { ResponseService } from '../../core/response/response.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private localkey: string = '';
  private http = inject(HttpClient);
  private end: EndPoint = new EndPoint();

  constructor(
    private localstorage: LocalStorageService,
    private responseservice: ResponseService,
  ) {}

  public load_record(endpoint:string, load_pkey:number ): Observable<ResponseInterface> {
      this.localkey = this.localstorage.getItem('X-Token-Check')!;
      let url = this.end.load_record_endpoint(endpoint, load_pkey);
      let response = this.http.get <ResponseInterface> (url,{
        headers:{
          'X-Token-Check': this.localkey
        }
      });
      
      return this.process_response(response);
  }

   public load_all_records(endpoint:string ): Observable<ResponseInterface> {
      this.localkey = this.localstorage.getItem('X-Token-Check')!;
      let url = this.end.load_all_records_endpoint(endpoint);
      let response = this.http.get <ResponseInterface> (url,{
        headers:{
          'X-Token-Check': this.localkey        
        }
      });
      return response;
    }

    public process_response(response:any) {
      this.responseservice.sendResponse(response);
      let access = (key: string) => {
          return response[key as keyof typeof response];
        };
      
      return <any> Object.assign([], access("data")) ;
    }
}
