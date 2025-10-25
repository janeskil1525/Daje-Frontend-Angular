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
import { TableObjectGUIService } from '../table-object/table-object.gui.service';
import { VersionsGuiService } from '../versions/versions.gui.service';
import { TableObjectIndexGuiService } from '../table-object-index/table.object.index.gui.service';
import { TableObjectSqlGuiService } from '../table-object-sql/table.object.sql.gui.service';

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
    private tableObjecteGUI: TableObjectGUIService,
    private versionsGUI: VersionsGuiService,
    private tableobjectindexGUIservice:TableObjectIndexGuiService,
    private tableobjectsqlGUIservice: TableObjectSqlGuiService
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
        this.tableObjecteGUI.sendClickEvent(0, false);
        this.objecteGUI.sendClickEvent(0,false);
        this.tableobjectindexGUIservice.sendClickEvent(0, false);
        this.versionsGUI.sendClickEvent(
          event.node.data.tools_version_pkey, true
        );

        this.items = [
          {label:'Table', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode, 1)}, 
          {label:'Index', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode, 2)}, 
          {label:'SQL', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode, 3)}
        ];
    } else if ( type === "tools_objects1") {
      this.tableObjecteGUI.sendClickEvent(0, false);
      this.versionsGUI.sendClickEvent(0, false);
      this.items = [
          {label:'New Table Object', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode, 0)}
        ];
      this.tableobjectindexGUIservice.sendClickEvent(0, false);
      this.objecteGUI.sendClickEvent(
        event.node.data.tools_objects_pkey, true
      )
    } else if ( type === "tools_objects2") {
      this.tableObjecteGUI.sendClickEvent(0, false);
      this.versionsGUI.sendClickEvent(0, false);
      this.items = [
          {label:'New Index Object', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode, 2)}
        ];
      this.tableobjectindexGUIservice.sendClickEvent(0, false);
      this.objecteGUI.sendClickEvent(
        event.node.data.tools_objects_pkey, true
      )
    } else if ( type === 'tools_object_tables') {
      this.versionsGUI.sendClickEvent(0, false);
      this.objecteGUI.sendClickEvent(0,false);
      this.tableobjectindexGUIservice.sendClickEvent(0, false)
      this.tableObjecteGUI.sendClickEvent(event.node.data.tools_object_tables_pkey, true);
    } else if ( type === 'tools_object_index') {
      this.versionsGUI.sendClickEvent(0, false);
      this.objecteGUI.sendClickEvent(0,false);
      this.tableObjecteGUI.sendClickEvent(0, false);
      this.tableobjectindexGUIservice.sendClickEvent(event.node.data.tools_object_index_pkey, true)
    }
  }

  addItem(node: any, object_type:number) {
    let type = this.getType(node);
    if (type === "tools_version") {
      this.versionsGUI.sendClickEvent(0, false);
      this.tableObjecteGUI.sendClickEvent(0, false);
      this.objecteGUI.sendClickEvent(0,true, node, object_type);
    } else if ( type === "tools_objects1") {
      this.versionsGUI.sendClickEvent(0,false);
      this.objecteGUI.sendClickEvent(0,false);
      this.tableObjecteGUI.sendClickEvent(0, true, node);
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
    if ( type === "tools_objects") {
      type = type + node.data.tools_object_types_fkey
    }
    return type;
  }
}

