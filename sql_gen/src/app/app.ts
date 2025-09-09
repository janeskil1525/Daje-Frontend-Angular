import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { Projects } from './services/projects';
import { Treelist } from './services/treelist';
import { ToolsProjects } from './interfaces/tools.projects';
import { MenuItem } from 'primeng/api';
import { NewProject } from './dialogs/newproject';
import { LocalStorageService } from './services/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [SelectModule, FormsModule, TreeModule, ContextMenuModule, ToastModule, NewProject],
  standalone: true
})

export class App {
  tools_projects_pkey: number = 0;
  selectedNode: string = "";
  nodes: any;


  projects: ToolsProjects[] = [];
  items: MenuItem[] = [{label:'Table'}, {label:'Index'}, {label:'SQL'}];

  constructor(
    private projectservice: Projects, private treelistservice: Treelist, private localstorage: LocalStorageService
  ) {}  


  ngOnInit() {
    this.localstorage.setItem('X-Token-Check', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW5pZXNfcGtleSI6MiwiaXNfYWRtaW4iOjAsIm5hbWUiOiJLbmVwIMOlIEtuw6VwIiwicGFzc3dvcmQiOiIwZ1lXNmpNdTd0XC9xZU5EdVFLaE43bE5KYm1pNEdOTGlUT3hkVlZScW1rMjROWUFqaUJUSWdFOGI0cFNYV1c2ZXZHT1BGUVdVMEttcnRydmpoWThkdUEiLCJzdXBwb3J0IjowLCJ1c2VyaWQiOiJqYW5AZGFqZS53b3JrIiwidXNlcm5hbWUiOiJKYW4gRXNraWxzc29uIiwidXNlcnNfcGtleSI6M30.sjcjX_9HVzDnIioX8iWBOZ7jMR26O4GXzxtzldlUWDw')
     this.projectservice.getData().subscribe((data) => {
          this.projects = data;
    });
  };

  loadTreelist($event:any) {
    this.treelistservice.getData(this.tools_projects_pkey).subscribe((data) => {
          this.nodes = data;
    });
  };

  
}


