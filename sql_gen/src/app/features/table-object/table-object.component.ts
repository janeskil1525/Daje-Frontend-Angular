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
  clickEventsubscription:Subscription;
  isVisible: boolean = false;
  fieldname: string = "";
  length: number = 0;
  scale: number = 0;
  active:boolean = false;
  visible: boolean = false;
  tools_object_tables_pkey: number = 0;
  datatypes: TableObjectDatatypeInterface[] = [];

  constructor(private loadTableObjecteGUI:TableObjectService){
    
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
