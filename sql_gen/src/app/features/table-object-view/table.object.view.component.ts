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
import { TableObjectViewService } from './table.object.view.service';
import { TableObjectViewGuiService } from './table.object.view.gui.service';

@Component({
  selector: 'app-table.object.view.component',
  imports: [
    FormsModule,
    CardModule,
    FloatLabel,
    CommonModule,
    ButtonModule,

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
    private viewservice: TableObjectViewService,
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
      this.viewservice.load_view(tools_object_views_pkey).subscribe((response)=> {
          this.responseservice.sendResponse(response);
          let access = (key: string) => {
            return response[key as keyof typeof response];
          };
          this.payload = Object.assign({}, access("data")) ;
          
      })
    } else {
      this.isVisible = false;
      this.payload = this.initialInterface()
    }

  }
  saveObject() {
    this.payload.tools_version_fkey = this.viewGUI.getVersionData().id.split("-")[0];;

    this.workflowservice.callWorkflow(
        'tools', 'save_view', this.payload
    );

    this.isVisible = false;
  }

    initialInterface(){
    return {
      name:"", fields:"",conditions:"", 
      tools_version_fkey:0, tools_object_view_pkey:0, tools_objects_fkey:0
      editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:"", tools_projects_fkey:0
    };
  }
}
