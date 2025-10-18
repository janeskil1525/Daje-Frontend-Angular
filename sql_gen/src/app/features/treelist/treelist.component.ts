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
import { TableObjectService } from '../table-object/table-object.gui.service';
import { VersionsGuiService } from '../versions/versions.gui.service';

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
    private objecteGUI: ObjectGuiService,
    private responseservice: ResponseService ,
    private tableObjecteGUI: TableObjectService,
    private versionsGUI: VersionsGuiService,
  ) {};

    ngOnInit() {
      this.loadTreelistDataSub = this.loadTreeListService.getClickEvent().subscribe(()=>{
          this.treelistservice.getData(this.loadTreeListService.getTools_projects_pkey()).subscribe(response => {
              this.loadTreelist(response)
          });
      });
  }

  nodeSelect(event:any) {
    let type = this.getType(event.node);
    if (type === "tools_version") {
        this.versionsGUI.setVisibility(true);
        this.versionsGUI.sendClickEvent(
          event.node.data.tools_version_pkey
        );

        this.items = [
          {label:'Table', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}, 
          {label:'Index', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}, 
          {label:'SQL', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}
        ];
    } else if ( type === "tools_objects") {
      this.versionsGUI.setVisibility(false);
      this.versionsGUI.sendClickEvent(0);
      this.items = [
          {label:'New Table Object', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}
        ];
      this.versionsGUI.setVisibility(true);
      this.objecteGUI.sendClickEvent(
        event.node.data.tools_objects_pkey
      )
    } else if ( type === 'tools_object_tables') {
      this.versionsGUI.setVisibility(false);
      this.versionsGUI.sendClickEvent(0);
      this.objecteGUI.setVisibility(false);
      this.objecteGUI.sendClickEvent(0);
      
      this.tableObjecteGUI.sendClickEvent(event.node);
    }
  }

  addItem(node: any) {
    let type = this.getType(node);
    if (type === "tools_version") {
      this.versionsGUI.setVisibility(false);
      this.versionsGUI.sendClickEvent(0);
      this.objecteGUI.sendClickEvent(node);
    } else if ( type === "tools_objects") {
      this.tableObjecteGUI.sendClickEvent(node);
    }

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

  getType(node: any) {
    let type = node.id;
    type = type.split("-")[1];
    return type;
  }
}

