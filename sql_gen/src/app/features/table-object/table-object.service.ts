import { Injectable, inject } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TableObjectService {
  private localkey: string = '';
  constructor(
    private  localstorage: LocalStorageService
  ) {}  

  private http = inject(HttpClient);


  load_table_objects(tools_objects_fkey: number) {
    this.localkey = this.localstorage.getItem('X-Token-Check')!;
    return this.http.get(`http://localhost/tools/api/v1/table/objects/` + tools_objects_fkey, 
        { headers:{
      'X-Token-Check': this.localkey
    }});
  }

  load_table_object(tools_object_tables_pkey: number) {
    this.localkey = this.localstorage.getItem('X-Token-Check')!;
    return this.http.get(`http://localhost/tools/api/v1/table/object/` + tools_object_tables_pkey, 
        { headers:{
      'X-Token-Check': this.localkey
    }});
  }


}
