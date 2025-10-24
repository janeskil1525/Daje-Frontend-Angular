import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { ResponseService } from '../../core/response/response.service';
import { WorkflowService } from '../../core/workflow/workflow.service';
import { TableObjectSqlInterface } from './table.object.sql.interface';

@Component({
  selector: 'app-table-object-sql-component',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    CardModule,

  ],
  templateUrl: './table.object.sql.component.html',
  styleUrl: './table.object.sql.component.css'
})

export class TableObjectSqlComponent {
    isVisible:boolean = false;
    payload:TableObjectSqlInterface = this.initialInterface();
    clickEventsubscription!:Subscription;
    constructor(
        private responseservice: ResponseService,
        private workflowservice: WorkflowService,          
  ) {}

    saveTableObjectSql() {
    this.workflowservice.callWorkflow(
        'tools', 'save_object_sql', this.payload
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
      tools_object_sql_pkey:0, tools_version_fkey:0, tools_objects_fkey:0,
      sql_string:"",
      editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
    }
  }
}
