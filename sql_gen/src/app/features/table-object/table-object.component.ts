import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableObjectInterface } from './table-object.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { Subscription } from 'rxjs';
import { TableObjectService } from '../table-object/table-object.gui.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableObjectDatatypeInterface } from './table-object-datatype.interface';
import { TableObjectDatatypeService } from './table-object-datatype.service';
import { ResponseService } from '../../core/response/response.service';

@Component({
  selector: 'p-table-object-component',
  imports: [
    FormsModule, 
    InputTextModule, 
    FloatLabel, 
    CheckboxModule, 
    ButtonModule,
    CardModule,
    SelectModule
  ],
  templateUrl: './table-object.component.html',
  styleUrl: './table-object.component.css',
  standalone: true,
})

export class TableObjectComponent {
  tableobject!:TableObjectInterface;
  clickEventsubscription!:Subscription;
  isVisible: boolean = false;
  fieldname: string = "";
  length: number = 0;
  scale: number = 0;
  active:boolean = false;
  visible: boolean = false;
  tools_objects_tables_datatypes_pkey: number = 0;
  datatypes: TableObjectDatatypeInterface[] = [];

  constructor(
    private loadTableObjecteGUI:TableObjectService,
    private tableobjectdatatypeservice:TableObjectDatatypeService,
    private responseservice: ResponseService 
  ){}
    
   ngOnInit() {
    this.tableobjectdatatypeservice.load_table_objects_datatypes().subscribe((response) => {
        this.responseservice.sendResponse(response);
        let access = (key: string) => {
          return response[key as keyof typeof response];
        };

        this.datatypes = Object.assign([], access("data")) ;
    });

    this.clickEventsubscription = this.loadTableObjecteGUI.getClickEvent().subscribe(()=>{
        this.showWin(this.loadTableObjecteGUI.getObjectnData());
      })
    };
    
   showWin(data:any) {
    this.isVisible = true;

    let keyarr = data.id.split('-') ;
    let key = keyarr[0];
    let type = keyarr[1]; 

  }

  hideWin() {
     this.isVisible = false;
  }
  
  saveTableObject() {

  }

  setupGUI(tools_object_tables_pkey: number) {

  }
}
