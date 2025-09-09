import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Projects } from '../services/projects';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'p-newproject-dialog',
    templateUrl: './newproject.html',
    standalone: true,
    imports: [Dialog, ButtonModule, InputTextModule, FormsModule]
})
export class NewProject {
    visible: boolean = false;
    constructor( private projectservice: Projects ) {}  
    project: string = '';
    state: string = '';

    showDialog() {
        this.visible = true;
    }

    saveProject() {
        this.projectservice.addData(this.project, this.state);
        this.visible = false;
    }
}