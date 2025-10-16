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
import { VersionsService } from './versions.service';
import { ResponseService } from '../../core/response/response.service';

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
  payload: VersionsInterface = {
   tools_version_pkey:0, tools_projects_fkey:0, 
   version:0, name:"", locked:false, workflow_fkey:0,
   editnum:1, insby:"", insdatetime:"", modby:"", moddatetime:""
  }

  clickEventsubscription:Subscription;

  constructor(
    private versionsGUI: VersionsGuiService, 
    private versionsservice: VersionsService,
    private responseservice: ResponseService 
  ) {
      this.clickEventsubscription = this.versionsGUI.getClickEvent().subscribe((tools_version_pkey)=>{
        this.showWin(tools_version_pkey);
      })
  };

  showWin(tools_version_pkey: any) {    
    this.isVisible = true;

    this.versionsservice.load_version(tools_version_pkey).subscribe((response)=> {
        this.responseservice.sendResponse(response);
        let access = (key: string) => {
          return response[key as keyof typeof response];
        };

        this.payload = Object.assign([], access("data")) ;
    })
    

  }
}
