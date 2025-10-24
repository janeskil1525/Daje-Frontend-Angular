import { Injectable, inject } from '@angular/core';

import { Observable }  from 'rxjs';
import { HttpClient, } from '@angular/common/http';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { ResponseInterface } from '../../core/response/response.interface';

@Injectable({
  providedIn: 'root'
})
export class TableObjectSqlService {
  private localkey: string = '';
    constructor(
      private  localstorage: LocalStorageService
    ) {}  

    private http = inject(HttpClient);


    load_table_object_sql(tools_object_sql_pkey: number): Observable<ResponseInterface> {
      this.localkey = this.localstorage.getItem('X-Token-Check')!;
      return this.http.get <ResponseInterface> (`http://localhost/tools/api/v1/objects/sql/` + tools_object_sql_pkey, 
          { headers:{
        'X-Token-Check': this.localkey
      }});
    }
}
