import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { TreelistService } from '../../core/treelist/treelist.service';
import { ContextMenu } from 'primeng/contextmenu';
import { TreelistLoadService } from '../../core/treelist/treelist.load.service';
import { Subscription } from 'rxjs';
import { BadgeModule } from 'primeng/badge';
import { ObjectGuiService } from '../object/object.gui.service';
import { ResponseService } from '../../core/response/response.service';
import { ResponseInterface } from '../../core/response/response.interface';

@Component({
  selector: 'p-object-treelist',
  imports: [TreeModule, ContextMenu,  BadgeModule, CommonModule],
  templateUrl: './treelist.html',
  styleUrl: './treelist.css'
})


export class TreelistComponent{
  selectedNode: string = "";
  nodes:any;
  items: MenuItem[] = [];

  @ViewChild('cm') cm!: ContextMenu;
  selectedId!: string;

  loadTreelistDataSub!:Subscription;

   constructor(
    private treelistservice: TreelistService, 
    private loadTreeListService: TreelistLoadService,
    private loadObjecteGUI: ObjectGuiService,
    private responseservice: ResponseService 
  ) {};

    ngOnInit() {
      this.loadTreelistDataSub = this.loadTreeListService.getClickEvent().subscribe(()=>{
          this.treelistservice.getData(this.loadTreeListService.getTools_projects_pkey()).subscribe(response => {
              this.loadTreelist(response)
          });
      });



     this.items = [
      {label:'Table', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}, 
      {label:'Index', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}, 
      {label:'SQL', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}
    ];
  }

  addItem(node: any) {
    this.loadObjecteGUI.sendClickEvent(node);
  }

  onHide() {
    this.selectedNode = this.selectedNode;
    this.selectedId = '';
  }
  

  loadTreelist(response: ResponseInterface[]) {
    this.responseservice.sendResponse(response);

    let access = (key: string) => {
      return response[key as keyof typeof response];
    };

    this.nodes = Object.assign([], access("data")) ;
  
  };
}

