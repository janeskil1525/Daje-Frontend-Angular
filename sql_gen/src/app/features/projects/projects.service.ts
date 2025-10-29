import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseInterface } from '../../core/response/response.interface';
import { Observable }  from 'rxjs';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {
  private data: any[] = [];
  private localkey: string = '';

  private http = inject(HttpClient);

  constructor(private localstorage: LocalStorageService) {}

   getData(): Observable<ResponseInterface[]> {
    let url = environment.apiUrl;
    this.localkey = this.localstorage.getItem('X-Token-Check')!;

    return this.http.get<ResponseInterface[]>(url + '/tools/api/v1/projects',{
      headers:{
        'X-Token-Check': this.localkey
        //''
      }
    });

  }



}
