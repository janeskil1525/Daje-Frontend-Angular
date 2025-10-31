import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { TreelistLoadService } from '../../core/treelist/treelist.load.service';
import { Subscription } from 'rxjs';
import { BadgeModule } from 'primeng/badge';
import { ObjectGuiService } from '../object/object.gui.service';
import { TableObjectGUIService } from '../table-object/table-object.gui.service';
import { VersionsGuiService } from '../versions/versions.gui.service';
import { TableObjectIndexGuiService } from '../table-object-index/table.object.index.gui.service';
import { TableObjectSqlGuiService } from '../table-object-sql/table.object.sql.gui.service';
import { DatabaseService } from '../../core/database/database.service';

@Component({
  selector: 'p-object-treelist',
  imports: [TreeModule, ContextMenu,  BadgeModule, CommonModule],
  templateUrl: './treelist.html',
  styleUrl: './treelist.css',
  standalone: true,
})


export class TreelistComponent{
  selectedNode: string = "";
  nodes:any;
  items: MenuItem[] = [];

  @ViewChild('cm') cm!: ContextMenu;
  selectedId!: string;

  loadTreelistDataSub!:Subscription;

   constructor(
    private dbservice: DatabaseService, 
    private loadTreeListService: TreelistLoadService,
    private objecteGUI: ObjectGuiService,
    private tableObjecteGUI: TableObjectGUIService,
    private versionsGUI: VersionsGuiService,
    private tableobjectindexGUIservice:TableObjectIndexGuiService,
    private tableobjectsqlGUIservice: TableObjectSqlGuiService
  ) {};

    ngOnInit() {
      this.loadTreelistDataSub = this.loadTreeListService.getClickEvent().subscribe(()=>{
          this.dbservice.load_record('Treelist', this.loadTreeListService.getTools_projects_pkey()).subscribe(response => {
            this.nodes = ((this.dbservice.process_response(response) as unknown) as any)
          });
      });
  }

  nodeSelect(event:any) {
    let type = this.getType(event.node);
    if ( type.indexOf("tools_objects") > -1 ) {
      this.items = [
          {label:'Table', icon: PrimeIcons.PLUS, command: (event) => this.addObject(this.selectedNode, 1)}, 
          {label:'Index', icon: PrimeIcons.PLUS, command: (event) => this.addObject(this.selectedNode, 2)}, 
          {label:'SQL', icon: PrimeIcons.PLUS, command: (event) => this.addObject(this.selectedNode, 3)}
        ];
    }
    if (type === "tools_version") {
        this.tableObjecteGUI.sendClickEvent(0, false);
        this.objecteGUI.sendClickEvent(0,false);
        this.tableobjectindexGUIservice.sendClickEvent(0, false);
        this.versionsGUI.sendClickEvent(
          event.node.data.tools_version_pkey, true
        );

        
    } else if ( type === "tools_objects1") {
      this.tableObjecteGUI.sendClickEvent(0, false);
      this.versionsGUI.sendClickEvent(0, false);
      this.items.push({label:'New Table Object', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode, 0)});
      this.tableobjectindexGUIservice.sendClickEvent(0, false);
      this.objecteGUI.sendClickEvent(
        event.node.data.tools_objects_pkey, true
      )
    } else if ( type === "tools_objects2") {
      this.tableObjecteGUI.sendClickEvent(0, false);
      this.versionsGUI.sendClickEvent(0, false);
      this.items.push({label:'New Index Object', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode, 2)});
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
    if ( type === "tools_objects1") {
      this.versionsGUI.sendClickEvent(0,false);
      this.objecteGUI.sendClickEvent(0,false);
      this.tableObjecteGUI.sendClickEvent(0, true, node);
    }
  }

  addObject(node: any, object_type:number) {
    this.versionsGUI.sendClickEvent(0, false);
    this.tableObjecteGUI.sendClickEvent(0, false);
    this.objecteGUI.sendClickEvent(0,true, node, object_type);
  }

  onHide() {
    this.selectedNode = this.selectedNode;
    this.selectedId = '';
  }
  
  getType(node: any) {
    let type = node.id;
    type = type.split("-")[1];
    if ( type === "tools_objects") {
      type = type + node.data.tools_object_types_fkey
    }
    return type;
  }
}

