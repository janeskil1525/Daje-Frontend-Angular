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
import { SelectModule } from 'primeng/select';
import { ObjectInterface } from './object.interface';
import { WorkflowService } from '../../core/workflow/workflow.service';
import { ResponseService } from '../../core/response/response.service';
import { ObjectTypeInterface } from './object.type.interface';
import { TreelistLoadService } from '../../core/treelist/treelist.load.service';
import { DatabaseService } from '../../core/database/database.service';

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
    SelectModule,
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
  objecttypes:ObjectTypeInterface[] = [];
  tools_object_types_pkey:number = 0;

  constructor(
    private objectGUI: ObjectGuiService, 
    private workflowservice: WorkflowService,
    private responseservice: ResponseService,
    private dbservice: DatabaseService,
    private treelistloadservice:TreelistLoadService,
  ) {}

  ngOnInit() {
      this.dbservice.load_all_records('ObjectTypes').subscribe((response) => {
          this.objecttypes = (
            this.dbservice.process_response(
              response, this.initialInterface()
            ) as unknown) as ObjectTypeInterface[];        
      });

      this.loadObjectGUISub = this.objectGUI.getClickEvent().subscribe((tools_object_pkey)=>{
          this.showWin(tools_object_pkey);
      });
    }

  saveObject() {
  
    this.payload.tools_projects_fkey = this.treelistloadservice.getTools_projects_pkey();
    this.payload.tools_version_fkey = this.objectGUI.getVersionData().id.split("-")[0];;
    this.payload.tools_object_types_fkey = this.tools_object_types_pkey;

    this.workflowservice.callWorkflow(
        'tools', 'save_object', this.payload
    );

    this.isVisible = false;
  }

  showWin(tools_object_pkey:number) {
    if(this.objectGUI.getVisibility() === true) {
      this.isVisible = true;
      this.dbservice.load_record('Object', tools_object_pkey).subscribe((response)=> {
          this.responseservice.sendResponse(response);
          let access = (key: string) => {
            return response[key as keyof typeof response];
          };
          this.payload = Object.assign({}, access("data")) ;
          if(this.payload.active) this.payload.active = true;
          if(this.payload.tools_object_types_fkey > 0) {
            this.tools_object_types_pkey = this.payload.tools_object_types_fkey
          } else {
            this.tools_object_types_pkey = this.objectGUI.getObjectType();
          }
          
      })
    } else {
      this.isVisible = false;
      this.payload = this.initialInterface();
      this.tools_object_types_pkey = this.objectGUI.getObjectType();
    }

  }
  
  hideWin() {
     this.isVisible = false;
  }

  setupGUI(tools_object_types_pkey:number) {

  }

  initialInterface(){
    return {
      name:"", active:true,type:"", 
      tools_version_fkey:0, tools_objects_pkey:0, tools_object_types_fkey:0,
      editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:"", tools_projects_fkey:0
    };
  }
}
