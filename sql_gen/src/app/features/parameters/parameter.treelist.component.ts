import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../core/database/database.service';
import { ParameterTreelistLoadService } from './parameter.treelist.load.service'
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { BadgeModule } from 'primeng/badge';


@Component({
  selector: 'p-parameter-treelist-component',
  imports: [
    TreeModule,  
    BadgeModule, 
    CommonModule,

  ],
  templateUrl: './parameter.treelist.component.html',
  styleUrl: './parameter.treelist.component.css',
  standalone: true,
})

export class ParameterTreelistComponent {
  paramnodes:any;
  selected: string = "";
  paramTreelist!:Subscription;

  constructor(
      private dbservice: DatabaseService, 
      private ParamTreeListService: ParameterTreelistLoadService,
  ){}

  ngOnInit() {
    this.paramTreelist = this.ParamTreeListService.getClickEvent().subscribe(()=>{
        this.dbservice.load_all_records('ParamTreelist').subscribe(response => {
          this.paramnodes = ((this.dbservice.process_response(response) as unknown) as any)
        });
    });
  }

  nodeSelect(event:any) {

  }
}
