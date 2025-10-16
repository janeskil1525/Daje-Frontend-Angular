import { Injectable, inject } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { ResponseInterface } from '../../core/response/response.interface';

@Injectable({
  providedIn: 'root'
})
export class VersionsService {
  
    private localkey: string = '';
    constructor(
      private  localstorage: LocalStorageService
    ) {}  

    private http = inject(HttpClient);
  

    load_version(tools_version_pkey: any) {
      this.localkey = this.localstorage.getItem('X-Token-Check')!;
      return this.http.get <ResponseInterface> (`http://localhost/tools/api/v1/versions/` + tools_version_pkey, 
          { headers:{
        'X-Token-Check': this.localkey
      }});
    }
}
