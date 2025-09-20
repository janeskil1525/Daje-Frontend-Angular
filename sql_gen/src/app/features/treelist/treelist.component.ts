import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MenuItem } from 'primeng/api';
import { TreelistService } from '../../core/treelist/treelist.service';
import { ContextMenu } from 'primeng/contextmenu';
import { TreelistLoadService } from '../../core/treelist/treelist.load.service';
import { Subscription } from 'rxjs';
import { Ripple } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'p-object-treelist',
  imports: [TreeModule, ContextMenu, Ripple, BadgeModule, CommonModule],
  templateUrl: './treelist.html',
  styleUrl: './treelist.css'
})


export class TreelistComponent{
  selectedNode: string = "";
  nodes:any;
  items: MenuItem[] = [{label:'Table'}, {label:'Index'}, {label:'SQL'}];

  @ViewChild('cm') cm!: ContextMenu;
  selectedId!: string;

  clickEventsubscription!:Subscription;
 

   constructor(
    private treelistservice: TreelistService, 
    private loadTreeListService: TreelistLoadService
  ) {};

    ngOnInit() {
      this.clickEventsubscription = this.loadTreeListService.getClickEvent().subscribe(()=>{
          this.treelistservice.getData(this.loadTreeListService.getTools_projects_pkey()).subscribe(data => {
              this.loadTreelist(data)
        });;
    });
  }

  onContextMenu(event: any) {
      this.cm.target = event.currentTarget;
      this.cm.show(event);
  }

  onHide() {
    this.selectedNode = this.selectedNode;
    this.selectedId = '';
  }
  

  loadTreelist(data: any) {
      this.nodes = data;
  };
}

