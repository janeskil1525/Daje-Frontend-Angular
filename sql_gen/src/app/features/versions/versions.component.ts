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

@Component({
  selector: 'p-versions.component',
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
  payload: VersionsInterface = {
   tools_version_pkey:0, tools_projects_fkey:0, 
   version:0, name:"", locked:false, workflow_fkey:0,
   editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
  }

  clickEventsubscription:Subscription;

  constructor(private versionsGUI: VersionsGuiService) {
    this.clickEventsubscription = this.versionsGUI.getClickEvent().subscribe((payload)=>{
      this.showWin(payload);
    })

  };

  showWin(payload: VersionsInterface) {    
    this.isVisible = true;
    this.payload = payload;
  }
}
