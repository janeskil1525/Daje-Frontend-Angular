import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableObjectInterface } from './table-object.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { Subscription } from 'rxjs';
import { TableObjectGUIService } from '../table-object/table-object.gui.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableObjectDatatypeInterface } from './table-object-datatype.interface';
import { TableObjectDatatypeService } from './table-object-datatype.service';
import { ResponseService } from '../../core/response/response.service';
import { WorkflowService } from '../../core/workflow/workflow.service';
import { TableObjectService } from './table-object.service';

@Component({
  selector: 'p-table-object-component',
  imports: [
    FormsModule, 
    InputTextModule, 
    FloatLabel, 
    CheckboxModule, 
    ButtonModule,
    CardModule,
    SelectModule
  ],
  templateUrl: './table-object.component.html',
  styleUrl: './table-object.component.css',
  standalone: true,
})

export class TableObjectComponent {
  payload:TableObjectInterface = this.initialInterface();
  clickEventsubscription!:Subscription;
  isVisible: boolean = false;
  isLengthVisible: boolean = true;
  isScaleVisible: boolean = true;
  tools_objects_tables_datatypes_pkey: number = 0;
  datatypes: TableObjectDatatypeInterface[] = [];

  constructor(
    private tableObjecteGUI:TableObjectGUIService,
    private tableobjectdatatypeservice:TableObjectDatatypeService,
    private responseservice: ResponseService,
    private workflowservice: WorkflowService,
    private tableobjectservice: TableObjectService 
  ){ }
    
   ngOnInit() {
    this.tableobjectdatatypeservice.load_table_objects_datatypes().subscribe((response) => {
        this.responseservice.sendResponse(response);
        let access = (key: string) => {
          return response[key as keyof typeof response];
        };
        this.datatypes  = <TableObjectDatatypeInterface[]> Object.assign([], access("data")) ;
    });

    this.clickEventsubscription = this.tableObjecteGUI.getClickEvent().subscribe((tools_object_tables_pkey) => {
        this.showWin(tools_object_tables_pkey);
      })
    };
    
   showWin(tools_object_tables_pkey:any) {
    this.winVisible(this.tableObjecteGUI.getVisibility());
    if(tools_object_tables_pkey === 0 && this.isVisible === true) {
      this.initializeNew();      
    } else if (tools_object_tables_pkey > 0 && this.isVisible === true) {
      // Load table object
      this.tableobjectservice.load_table_object(tools_object_tables_pkey).subscribe((response) => {
        this.responseservice.sendResponse(response);
        let access = (key: string) => {
          return response[key as keyof typeof response];
        };

        this.payload  = <TableObjectInterface> Object.assign([], access("data")) ;
        if(this.payload.active) this.payload.active = true;
        if(this.payload.visible) this.payload.visible = true;
        this.tools_objects_tables_datatypes_pkey = this.payload.tools_objects_tables_datatypes_fkey        
        this.setupGUI(this.tools_objects_tables_datatypes_pkey);
      });
    }

  }

  winVisible(isVisible:boolean) {
     this.isVisible = isVisible;
     if (isVisible === false) {
      this.payload = this.initialInterface();
     }
  }
  
  saveTableObject(tools_objects_tables_datatypes_pkey:number) {
    this.payload.tools_objects_tables_datatypes_fkey = tools_objects_tables_datatypes_pkey;

    this.workflowservice.callWorkflow(
        'tools', 'save_new_table_object', this.payload
    );

    this.isVisible = false;
  }

  setupGUI(tools_objects_tables_datatypes_pkey: number) {
    let result = this.datatypes.find(
      datatype => datatype.tools_objects_tables_datatypes_pkey === tools_objects_tables_datatypes_pkey
    );
    if (result !== undefined){
      if(result.length === 1){
        this.isLengthVisible = true;
      } else {
        this.isLengthVisible = false;
      }
      if(result.scale === 1){
        this.isScaleVisible = true;
      } else {
        this.isScaleVisible = false;
      }
    }
  }

  initializeNew() {
      this.payload = this.initialInterface();
      let node = this.tableObjecteGUI.getObjectData();
      this.payload.tools_objects_fkey = node.data.tools_objects_pkey;
      this.payload.tools_version_fkey = node.data.tools_version_fkey;
  }

  initialInterface() {
    return {
      tools_object_tables_pkey:0, tools_version_fkey:0, 
      tools_objects_fkey:0, fieldname: "",
      tools_objects_tables_datatypes_fkey:0, length:0,
      scale:0, active:false, visible:false,
      editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
    };
  }
}
