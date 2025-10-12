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
import { ObjectInterface } from './object.interface';
import { WorkflowService } from '../../core/workflow/workflow.service';

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
  payload: ObjectInterface = {
    name:"", active:true,type:"", 
    tools_version_fkey:0, tools_objects_pkey:0
  };

  constructor(
    private loadObjectGUI: ObjectGuiService, 
    private workflowservice: WorkflowService
  ) {}

  ngOnInit() {
        this.loadObjectGUISub = this.loadObjectGUI.getClickEvent().subscribe(()=>{
          this.showWin(this.loadObjectGUI.getVersionData())
      });
    }

  saveObject() {
  
    this.payload.tools_version_fkey = this.loadObjectGUI.getVersionData().id.split("-")[0];;
    this.payload.type = 'table',

    this.workflowservice.callWorkflow(
        'tools', 'save_new_object', this.payload
    );

    this.isVisible = false;
  }

  showWin(data:any) {
    this.isVisible = true;

    let keyarr = data.id.split('-') ;
    let key = keyarr[0];
    let type = keyarr[2]; 

  }
  
  hideWin() {
     this.isVisible = false;
  }
}
