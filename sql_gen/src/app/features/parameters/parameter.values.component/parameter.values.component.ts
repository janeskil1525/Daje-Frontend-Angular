import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../core/database/database.service';
import { CommonModule } from '@angular/common';
import { ParameterValuesLoadService } from './parameter.values.load.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ParameterValuesInterface } from './parameter.values.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { WorkflowService } from '../../../core/workflow/workflow.service';

@Component({
  selector: 'p-parameter-values-component',
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    CardModule,
    CheckboxModule,
    TextareaModule
  ],
  templateUrl: './parameter.values.component.html',
  styleUrl: './parameter.values.component.css'
})

export class ParameterValuesComponent {
  loadGUISub!:Subscription;
  isVisible:boolean = false;
  payload:ParameterValuesInterface = this.initialInterface();

  constructor(
      private dbservice: DatabaseService, 
      private loadGUIService: ParameterValuesLoadService,
      private workflowservice: WorkflowService,
  ){}

  ngOnInit() {
        this.loadGUISub = this.loadGUIService.getClickEvent().subscribe(()=>{
            this.showWin(
              this.loadGUIService.getTools_projects_pkey(),
              this.loadGUIService.getTools_parameters_pkey()
          );
      });
  }

  showWin(tools_projects_pkey:number, tools_parameters_pkey:number) {
     this.winVisible(this.loadGUIService.getVisibility());
     if(this.isVisible){
        this.dbservice.setKey2(tools_parameters_pkey)
        this.dbservice.load_record('ParameterValue', tools_projects_pkey).subscribe((response) => {        
            this.payload = (this.dbservice.process_response(response) as unknown) as ParameterValuesInterface;
            if(this.payload.active) this.payload.active = true;          
        });
    } else {
      this.dbservice.setKey2(0);
      this.payload = this.initialInterface();
    }
  }

  saveTableObject() {
    
    this.payload.tools_projects_fkey = this.loadGUIService.getTools_projects_pkey();
    this.payload.tools_parameters_fkey = this.loadGUIService.getTools_parameters_pkey();
    //if(!this.payload.active) this.payload.active = false;   

    this.workflowservice.callWorkflow(
        'tools', 'save_parameter_value', this.payload
    );

    //this.isVisible = false;
  }

  winVisible(visible:boolean) {
    this.isVisible = visible;
  }

  initialInterface() {
    return {
      tools_parameter_values_pkey:0, tools_projects_fkey:0, tools_parameters_fkey:0,
      value:"", description:"", active:false,
      editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
    }
  }
}
