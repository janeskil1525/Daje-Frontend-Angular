import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WorkflowService } from '../../core/workflow/workflow.service';
import { WorkflowPayload } from '../../core/workflow/workflow.payload';
import { WorkflowPayloadInterface } from '../../core/workflow/workflow.interface';

import { FormsModule } from '@angular/forms';
import { NewprojectInterface } from './newproject.interface';
import { ResponseService } from '../../core/response/response.service'

@Component({
    selector: 'p-newproject-dialog',
    templateUrl: './newproject.html',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule, FormsModule]
})

export class NewProjectComponent {
    visible: boolean = false;
    constructor( 
        private workflowservice: WorkflowService, 
        private responseservice: ResponseService 
    ) {}  
    
    project: string = '';
    state: string = '';

    showDialog() {
        this.visible = true;
    }

    saveProject() {    
        let load: WorkflowPayload;
        let workflowdata: WorkflowPayloadInterface;

        load = new WorkflowPayload();

        let payload: NewprojectInterface = {
            name: this.project,
            state: this.state,
        }
        
        workflowdata = load.builCall(
            'tools', 'save_new_project', payload, this.workflowservice.getConnectorData()
        );

        this.workflowservice.execute(workflowdata).subscribe(response => {
            this.responseservice.sendResponse(response);
            console.log(response);
        });
        this.visible = false;
    }
}