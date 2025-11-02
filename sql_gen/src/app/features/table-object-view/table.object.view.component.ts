import { Component } from '@angular/core';
import { ResponseService } from '../../core/response/response.service';
import { WorkflowService } from '../../core/workflow/workflow.service';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { TableObjectViewInterface } from './table.object.view.interface';
import { DatabaseService } from '../../core/database/database.service';
import { TableObjectViewGuiService } from './table.object.view.gui.service';

@Component({
  selector: 'app-table.object.view.component',
  imports: [
    FormsModule,
    CardModule,
    FloatLabel,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './table.object.view.component.html',
  styleUrl: './table.object.view.component.css',
  standalone: true,
})
export class TableObjectViewComponent {
  loadObjectGUISub!:Subscription;
  isVisible: boolean = false;
  payload: TableObjectViewInterface = this.initialInterface();

  constructor(    
    private workflowservice: WorkflowService,
    private responseservice: ResponseService,
    private dbservice: DatabaseService,
    private viewGUI: TableObjectViewGuiService
  ){}

  ngOnInit() {
    this.loadObjectGUISub = this.viewGUI.getClickEvent().subscribe((tools_object_pkey)=>{
        this.showWin(tools_object_pkey);
    });
  }

  showWin(tools_object_views_pkey:number) {
    if(this.viewGUI.getVisibility() === true) {
      this.isVisible = true;
      this.dbservice.load_record('View',tools_object_views_pkey).subscribe((response)=> {          
        this.payload = (this.dbservice.process_response(response, this.initialInterface()) as unknown) as TableObjectViewInterface;        
      })
    } else {
      this.isVisible = false;
      this.payload = this.initialInterface()
    }

  }
  saveView() {
    this.payload.tools_version_fkey = this.viewGUI.getVersionData().id.split("-")[0];;

    this.workflowservice.callWorkflow(
        'tools', 'save_object_view', this.payload
    );

    this.isVisible = false;
  }

    initialInterface(){
    return {
      name:"", fields:"",conditions:"", 
      tools_version_fkey:0, tools_object_view_pkey:0, tools_objects_fkey:0,
      editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:"", tools_projects_fkey:0
    };
  }

  winVisible(isVisible:boolean) {
    this.isVisible = isVisible;
  }
}
