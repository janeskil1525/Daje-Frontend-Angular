import { Injectable, inject } from '@angular/core';
import { Observable }  from 'rxjs';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { ResponseInterface } from '../../core/response/response.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  private localkey: string = '';
  private http = inject(HttpClient);

  constructor(private localstorage: LocalStorageService) {}

  load_object(tools_objects_pkey:number): Observable<ResponseInterface> {
      this.localkey = this.localstorage.getItem('X-Token-Check')!;
      return this.http.get <ResponseInterface> ('http://localhost/tools/api/v1/object/' + tools_objects_pkey,{
        headers:{
          'X-Token-Check': this.localkey
          //''
        }
      });
  }
}
