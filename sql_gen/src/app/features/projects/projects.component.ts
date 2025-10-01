import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ProjectsService } from './projects.service';
import { ProjectsInterface } from './projects.interface';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { TreelistService } from '../../core/treelist/treelist.service';
import { TreelistLoadService } from '../../core/treelist/treelist.load.service';
import { ResponseService } from '../../core/response/response.service'

@Component({
  selector: 'p-select-projects',
  imports: [SelectModule, FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})

export class ProjectsComponent {
    tools_projects_pkey: number = 0;
    nodes = model();

    projects: ProjectsInterface[] = [];
    
    constructor(
      private projectservice: ProjectsService,  
      private localstorage: LocalStorageService, 
      private treelistservice: TreelistService,
      private loadTreeListService: TreelistLoadService,
      private responseservice: ResponseService 
    ) {}  
  
    ngOnInit() {
      this.localstorage.setItem('X-Token-Check', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW5pZXNfcGtleSI6MiwiaXNfYWRtaW4iOjAsIm5hbWUiOiJLbmVwIMOlIEtuw6VwIiwicGFzc3dvcmQiOiIwZ1lXNmpNdTd0XC9xZU5EdVFLaE43bE5KYm1pNEdOTGlUT3hkVlZScW1rMjROWUFqaUJUSWdFOGI0cFNYV1c2ZXZHT1BGUVdVMEttcnRydmpoWThkdUEiLCJzdXBwb3J0IjowLCJ1c2VyaWQiOiJqYW5AZGFqZS53b3JrIiwidXNlcm5hbWUiOiJKYW4gRXNraWxzc29uIiwidXNlcnNfcGtleSI6M30.sjcjX_9HVzDnIioX8iWBOZ7jMR26O4GXzxtzldlUWDw')
       this.projectservice.getData().subscribe((response) => {
        
            this.responseservice.sendResponse(response);
            let access = (key: string) => {
              return response[key as keyof typeof response];
            };

            this.projects = Object.assign([], access("data")) ;
      });
    };
  
    loadTreeList(tools_projects_pkey: number) {
      this.loadTreeListService.sendClickEvent(tools_projects_pkey);
    };

}

