import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class VersionsService {
  
    private localkey: string = '';
    constructor(
      private  localstorage: LocalStorageService
    ) {}  

    private http = inject(HttpClient);
  

    load_version(data: any) {
      this.localkey = this.localstorage.getItem('X-Token-Check')!;
      return this.http.get(`http://localhost/tools/api/v1/versions/`, 
          { headers:{
        'X-Token-Check': this.localkey
      }});
    }
}
