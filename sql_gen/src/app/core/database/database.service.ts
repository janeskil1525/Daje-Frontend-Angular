import { Injectable, inject } from '@angular/core';
import { Observable }  from 'rxjs';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { ResponseInterface } from '../../core/response/response.interface';
import { HttpClient } from '@angular/common/http';
import { EndPoint } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private localkey: string = '';
  private http = inject(HttpClient);
  private end: EndPoint = new EndPoint();


  constructor(private localstorage: LocalStorageService) {}

  load_record(endpoint:string, load_pkey:number ): Observable<ResponseInterface> {
      this.localkey = this.localstorage.getItem('X-Token-Check')!;

      let url = this.end.load_record_endpoint(endpoint, load_pkey);
       //  `${this.baseUrl}/${EndPoints[endpoint as keyof typeof EndPoints]}/` + load_pkey;
      return this.http.get <ResponseInterface> (url,{
        headers:{
          'X-Token-Check': this.localkey
          //''
        }
      });
  }

   load_all_records(endpoint:string ): Observable<ResponseInterface> {
      this.localkey = this.localstorage.getItem('X-Token-Check')!;

      let url = this.end.load_all_records_endpoint(endpoint);
       //  `${this.baseUrl}/${EndPoints[endpoint as keyof typeof EndPoints]}/` + load_pkey;
      return this.http.get <ResponseInterface> (url,{
        headers:{
          'X-Token-Check': this.localkey
          //''
        }
      });
  }
}
