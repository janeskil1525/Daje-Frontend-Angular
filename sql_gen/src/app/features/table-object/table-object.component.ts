import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableObjectInterface } from './table-object.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { Subscription } from 'rxjs';
import { TableObjectService } from '../table-object/table-object.gui.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableObjectDatatypeInterface } from './table-object-datatype.interface';
import { TableObjectDatatypeService } from './table-object-datatype.service';
import { ResponseService } from '../../core/response/response.service';
import { WorkflowService } from '../../core/workflow/workflow.service';

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
  payload:TableObjectInterface = {
    tools_object_tables_pkey:0, tools_version_fkey:0, 
    tools_objects_fkey:0, fieldname: "",
    tools_objects_tables_datatypes_fkey:0, length:0,
    scale:0, active:0, visible:0,
    editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
};
  clickEventsubscription!:Subscription;
  isVisible: boolean = false;
  isLengthVisible: boolean = true;
  isScaleVisible: boolean = true;
  tools_objects_tables_datatypes_pkey: number = 0;
  datatypes: TableObjectDatatypeInterface[] = [];

  constructor(
    private tableObjecteGUI:TableObjectService,
    private tableobjectdatatypeservice:TableObjectDatatypeService,
    private responseservice: ResponseService,
        private workflowservice: WorkflowService 
  ){ }
    
   ngOnInit() {
    this.tableobjectdatatypeservice.load_table_objects_datatypes().subscribe((response) => {
        this.responseservice.sendResponse(response);
        let access = (key: string) => {
          return response[key as keyof typeof response];
        };

        this.datatypes  = <TableObjectDatatypeInterface[]> Object.assign([], access("data")) ;
    });

    this.clickEventsubscription = this.tableObjecteGUI.getClickEvent().subscribe((tools_object_tables_pkey)=>{
        this.showWin(tools_object_tables_pkey);
      })
    };
    
   showWin(tools_object_tables_pkey:number) {
    this.isVisible = this.tableObjecteGUI.getVisibility();
    if(tools_object_tables_pkey === 0 && this.isVisible === true) {
      let node = this.tableObjecteGUI.getObjectData();
      this.payload.tools_objects_fkey = node.data.tools_objects_pkey;
      this.payload.tools_version_fkey = node.data.tools_version_fkey;
    }
  }

  hideWin() {
     this.isVisible = false;
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
  
}
