import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { Subscription } from 'rxjs';
import { ResponseService } from '../../core/response/response.service';
import { WorkflowService } from '../../core/workflow/workflow.service';
import { TableObjectIndexInterface } from './table.object.index.interface';
import { TableObjectIndexGuiService } from '../table-object-index/table.object.index.gui.service';
import { TableObjectIndexService } from './table.object.index.service';

@Component({
  selector: 'p-table-object-index-component',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    CardModule,
    CheckboxModule
  ],
  templateUrl: './table.object.index.component.html',
  styleUrl: './table.object.index.component.css',
  standalone: true,
})
export class TableObjectIndexComponent {
  isVisible:boolean = false;
  payload:TableObjectIndexInterface = this.initialInterface();
  clickEventsubscription!:Subscription;

  constructor(
        private responseservice: ResponseService,
        private workflowservice: WorkflowService, 
        private tableobjectindexGUIservice:TableObjectIndexGuiService,         
        private indexservice:TableObjectIndexService,
  ) {}

  ngOnInit() {
      this.clickEventsubscription = this.tableobjectindexGUIservice.getClickEvent().subscribe((tools_object_index_pkey)=>{
        this.showWin(tools_object_index_pkey);
      });
  }

  showWin(tools_object_index_pkey:number) {
    this.isVisible = this.tableobjectindexGUIservice.getVisibility();
    if(this.isVisible) {
      this.indexservice.load_table_object_index(tools_object_index_pkey).subscribe((response)=> {
          this.responseservice.sendResponse(response);
          let access = (key: string) => {
            return response[key as keyof typeof response];
          };
          this.payload = Object.assign({}, access("data")) ;
      })
    } else {
      this.payload = this.initialInterface();
    }
  }

  saveTableObjectIndex() {

    this.workflowservice.callWorkflow(
        'tools', 'save_new_table_object', this.payload
    );

    this.isVisible = false;
  }

  winVisible(isVisible:boolean = false) {
      this.isVisible = isVisible;
     if (isVisible === false) {
      this.payload = this.initialInterface();
     }
  }

  initialInterface() {
    return {
        tools_object_index_pkey:0, tools_version_fkey:0, tools_objects_fkey:0,
        table_name:"", fields:"", index_unique: false,
        editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
    };
  }
}
