import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ObjectGuiService } from './object.gui.service';
import { Subscription } from 'rxjs';
import { ObjectInterface } from './object.interface';
import { WorkflowService } from '../../core/workflow/workflow.service';
import { WorkflowPayload } from '../../core/workflow/workflow.payload';
import { WorkflowPayloadInterface } from '../../core/workflow/workflow.interface';
import { ResponseService } from '../../core/response/response.service'

@Component({
  selector: 'p-object-component',
  imports: [
    InputTextModule, 
    FormsModule, 
    FloatLabel, 
    CardModule, 
    CommonModule, 
    ButtonModule, 
    CheckboxModule,
  ],
  templateUrl: './object.component.html',
  styleUrl: './object.component.css',
  standalone: true,
})

export class ObjectComponent {
  isActive: boolean = false;
  isVisible: boolean = false;
  tablename: string ="";
  loadObjectGUISub!:Subscription;

  constructor(
    private loadObjectGUI: ObjectGuiService, 
    private workflowservice: WorkflowService,
    private responseservice: ResponseService 
  ) {}

  ngOnInit() {
        this.loadObjectGUISub = this.loadObjectGUI.getClickEvent().subscribe(()=>{
          this.showWin(this.loadObjectGUI.getVersionData())
      });
    }

  saveObject() {
    let load: WorkflowPayload;
    let workflowdata: WorkflowPayloadInterface;

    load = new WorkflowPayload();

    let payload: ObjectInterface = {
        name: this.tablename,
        active: this.isActive,
        type:'table',
        tools_version_fkey: this.loadObjectGUI.getVersionData().id,
        tools_objects_pkey:0

    }
    
    workflowdata = load.builCall(
        'tools', this.loadObjectGUI.getVersionData().workflow_fkey, 'save_new_object', payload,'tools_project'
    );

    this.workflowservice.execute(workflowdata).subscribe(response => {
        this.responseservice.sendResponse(response)
        console.log(response);
    });
    this.isVisible = false;
  }

  showWin(data:any) {
    this.isVisible = true;

    let keyarr = data.id.split('-') ;
    let key = keyarr[0];
    let type = keyarr[2]; 

  }
  hideWin() {
     this.isVisible = false;
  }
}
