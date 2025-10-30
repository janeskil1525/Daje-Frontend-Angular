import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { VersionsInterface } from './versions.interface';
import { VersionsGuiService } from '../versions/versions.gui.service';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../core/database/database.service';

@Component({
  selector: 'p-versions-component',
  imports: [
    FormsModule, 
    InputTextModule, 
    FloatLabel, 
    CheckboxModule, 
    ButtonModule,
    CardModule
  ],
  templateUrl: './versions.component.html',
  styleUrl: './versions.component.css'
})

export class VersionsComponent {
  isVisible:boolean = false;
  payload: VersionsInterface = this.initialInterface();

  clickEventsubscription:Subscription;

  constructor(
    private versionsGUI: VersionsGuiService, 
    private dbservice: DatabaseService,    
  ) {
      this.clickEventsubscription = this.versionsGUI.getClickEvent().subscribe((tools_version_pkey)=>{
        this.showWin(tools_version_pkey);
      })
  };

  showWin(tools_version_pkey: any) {    
    if(this.versionsGUI.getVisibility() === true) {
      this.isVisible = true;
      this.dbservice.load_record('Versions',tools_version_pkey).subscribe((response)=> {          
          this.payload = response as unknown as VersionsInterface ;
          if(this.payload.locked) this.payload.locked = true;
      })
    } else {
      this.isVisible = false;
      this.payload = this.initialInterface();
    }
  }

  initialInterface() {
    return {
    tools_version_pkey:0, tools_projects_fkey:0, 
    version:0, name:"", locked:false, workflow_fkey:0,
    editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
    }
  }
}
