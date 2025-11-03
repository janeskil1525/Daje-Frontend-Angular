import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkflowService } from '../../../core/workflow/workflow.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'p-generate-sql-component',
  imports: [
    FormsModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './generate.sql.component.html',
  styleUrl: './generate.sql.component.css'
})
export class GenerateSqlComponent {


    constructor( 
        private workflowservice: WorkflowService
    ) {}  

    generateSQL() {

    }

    genereatePerl() {

    }
}
