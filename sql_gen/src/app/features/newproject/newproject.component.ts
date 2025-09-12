import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WorkflowService } from '../workflow/workflow.service';
import { FormsModule } from '@angular/forms';
import { NewprojectInterface } from './newproject.interface';

@Component({
    selector: 'p-newproject-dialog',
    templateUrl: './newproject.html',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule, FormsModule]
})
export class NewProjectComponent {
    visible: boolean = false;
    constructor( private workflowservice: WorkflowService ) {}  
    
    project: string = '';
    state: string = '';

    showDialog() {
        this.visible = true;
    }

    saveProject() {

        let workflowdata: NewprojectInterface = {
            workflow: 'tools',
            workflow_pkey: 0,
            activity:'save_new_project',
            project: this.project,
            state: this.state,
        }
        
        this.workflowservice.execute(workflowdata).subscribe(response => {
            console.log(response);
        });
        this.visible = false;
    }
}