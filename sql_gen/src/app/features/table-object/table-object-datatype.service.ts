import { Injectable, inject } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, } from '@angular/common/http';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { ResponseInterface } from '../../core/response/response.interface';

@Injectable({
  providedIn: 'root'
})

export class TableObjectDatatypeService {
    private localkey: string = '';
    constructor(
      private  localstorage: LocalStorageService
    ) {}  

  private http = inject(HttpClient);


  load_table_objects_datatypes(): Observable<ResponseInterface> {
    this.localkey = this.localstorage.getItem('X-Token-Check')!;
    return this.http.get <ResponseInterface> (`http://localhost/tools/api/v1/table/obj/datatypes/`, 
        { headers:{
      'X-Token-Check': this.localkey
    }});
  }
}
