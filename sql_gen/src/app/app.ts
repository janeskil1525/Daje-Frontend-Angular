import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { ProjectsComponent } from './features/projects/projects.component';

import { ObjectTreelist } from './features/treelist/treelist.coponent';
import { NewProject } from './features/newproject/newproject';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [ObjectTreelist, SelectModule, FormsModule, TreeModule, ContextMenuModule, ToastModule, NewProject, ProjectsComponent],
  standalone: true
})

export class App {
  
}


