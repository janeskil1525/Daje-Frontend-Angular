import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DatabaseService } from '../../core/database/database.service';
import { ProjectsInterface } from './projects.interface';
import { LocalStorageService } from '../../core/localstorage/local-storage.service';
import { WorkflowService } from '../../core/workflow/workflow.service';
import { TreelistLoadService } from '../../core/treelist/treelist.load.service';
import { ParameterTreelistLoadService } from '../parameters/parameter.treelist.component/parameter.treelist.load.service'

@Component({
  selector: 'p-select-projects',
  imports: [SelectModule, FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  standalone: true,
})

export class ProjectsComponent {
    tools_projects_pkey: number = 0;
    nodes = model();

    projects: ProjectsInterface[] = [];
    
    constructor(
      private dbservice: DatabaseService,
      private localstorage: LocalStorageService, 
      private workflowservice: WorkflowService,
      private loadTreeListService: TreelistLoadService,
      private loadParamTreeService: ParameterTreelistLoadService,
    ) {}  
  
    ngOnInit() {
      this.localstorage.setItem('X-Token-Check', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW5pZXNfcGtleSI6MiwiaXNfYWRtaW4iOjAsIm5hbWUiOiJLbmVwIMOlIEtuw6VwIiwicGFzc3dvcmQiOiIwZ1lXNmpNdTd0XC9xZU5EdVFLaE43bE5KYm1pNEdOTGlUT3hkVlZScW1rMjROWUFqaUJUSWdFOGI0cFNYV1c2ZXZHT1BGUVdVMEttcnRydmpoWThkdUEiLCJzdXBwb3J0IjowLCJ1c2VyaWQiOiJqYW5AZGFqZS53b3JrIiwidXNlcm5hbWUiOiJKYW4gRXNraWxzc29uIiwidXNlcnNfcGtleSI6M30.sjcjX_9HVzDnIioX8iWBOZ7jMR26O4GXzxtzldlUWDw')
       this.dbservice.load_all_records('Projects').subscribe((response) => {            
            this.projects = (this.dbservice.process_response(response) as unknown) as ProjectsInterface[];
      });
    };
  
    loadTreeList(tools_projects_pkey: number) {
      let result = this.projects.find(project => project.tools_projects_pkey === tools_projects_pkey);
      this.workflowservice.setConnectorData('tools_projects', result!.tools_projects_pkey, result!.workflow_fkey)
      this.loadTreeListService.sendClickEvent(tools_projects_pkey);
      this.loadParamTreeService.sendClickEvent(tools_projects_pkey);
    };

}

