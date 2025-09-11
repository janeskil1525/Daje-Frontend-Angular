import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { ProjectsComponent } from './features/projects/projects.component';

import { TreelistComponent } from './features/treelist/treelist.component';
import { NewProjectComponent } from './features/newproject/newproject.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TreelistComponent, SelectModule, FormsModule, TreeModule, ContextMenuModule, ToastModule, NewProjectComponent, ProjectsComponent],
  standalone: true
})

export class App {
  
}


