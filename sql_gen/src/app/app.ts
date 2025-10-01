import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { ProjectsComponent } from './features/projects/projects.component';

import { TreelistComponent } from './features/treelist/treelist.component';
import { NewProjectComponent } from './features/newproject/newproject.component';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { ObjectComponent } from './features/object/object.component';
import { ResponseComponent } from './core/response/response.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TreelistComponent, 
    SelectModule, 
    FormsModule, 
    TreeModule, 
    ContextMenuModule, 
    ToastModule, 
    NewProjectComponent, 
    ProjectsComponent,
    SplitterModule,
    PanelModule,
    DividerModule,
    ObjectComponent,
    ResponseComponent
  ],

  standalone: true
})

export class App {
  
}


