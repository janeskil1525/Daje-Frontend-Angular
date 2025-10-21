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
import { ObjectService } from './object.service';
import { ResponseService } from '../../core/response/response.service';

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
  payload: ObjectInterface = this.initialInterface();

  constructor(
    private objectGUI: ObjectGuiService, 
    private workflowservice: WorkflowService,
    private responseservice: ResponseService,
    private objectservice: ObjectService
  ) {}

  ngOnInit() {
        this.loadObjectGUISub = this.objectGUI.getClickEvent().subscribe((tools_object_pkey)=>{
          this.showWin(tools_object_pkey);
      });
    }

  saveObject() {
  
    this.payload.tools_version_fkey = this.objectGUI.getVersionData().id.split("-")[0];;
    this.payload.type = 'table',

    this.workflowservice.callWorkflow(
        'tools', 'save_new_object', this.payload
    );

    this.isVisible = false;
  }

  showWin(tools_object_pkey:number) {
    if(this.objectGUI.getVisibility() === true) {
      this.isVisible = true;
      this.objectservice.load_object(tools_object_pkey).subscribe((response)=> {
          this.responseservice.sendResponse(response);
          let access = (key: string) => {
            return response[key as keyof typeof response];
          };
          this.payload = Object.assign({}, access("data")) ;
          if(this.payload.active) this.payload.active = true;
      })
    } else {
      this.isVisible = false;
      this.payload = this.initialInterface();
    }


  }
  
  hideWin() {
     this.isVisible = false;
  }

  initialInterface(){
    return {
      name:"", active:true,type:"", 
      tools_version_fkey:0, tools_objects_pkey:0, 
      editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
    };
  }
}
