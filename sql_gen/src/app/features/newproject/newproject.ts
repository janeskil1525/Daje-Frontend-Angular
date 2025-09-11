import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WorkflowService } from '../workflow/workflow.service';
import { FormsModule } from '@angular/forms';
import { WorkflowInterface } from '../workflow/workflow.interface';

@Component({
    selector: 'p-newproject-dialog',
    templateUrl: './newproject.html',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule, FormsModule]
})
export class NewProject {
    visible: boolean = false;
    constructor( private workflowservice: WorkflowService ) {}  
    
    project: string = '';
    state: string = '';

    showDialog() {
        this.visible = true;
    }

    saveProject() {
        let workflowdata!: WorkflowInterface = {
            workflow: 'tools',
            workflow_pkey: 0,
            data.project: this.project,
            data.state: this.state,
        }
        

        this.workflowservice.execute(workflowdata);
        this.visible = false;
    }
}