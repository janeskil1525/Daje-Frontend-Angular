import { Injectable, inject } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class TableObjectDatatypeService {
    private localkey: string = '';
    constructor(
      private  localstorage: LocalStorageService
    ) {}  

  private http = inject(HttpClient);


  load_table_objects_datatypes() {
    this.localkey = this.localstorage.getItem('X-Token-Check')!;
    return this.http.get(`http://localhost/tools/api/v1/table/objects/datatypes/`, 
        { headers:{
      'X-Token-Check': this.localkey
    }});
  }
}
