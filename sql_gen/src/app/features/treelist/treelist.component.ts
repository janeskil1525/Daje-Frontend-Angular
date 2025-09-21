import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { TreelistService } from '../../core/treelist/treelist.service';
import { ContextMenu } from 'primeng/contextmenu';
import { TreelistLoadService } from '../../core/treelist/treelist.load.service';
import { Subscription } from 'rxjs';
import { BadgeModule } from 'primeng/badge';

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

  clickEventsubscription!:Subscription;
 

   constructor(
    private treelistservice: TreelistService, 
    private loadTreeListService: TreelistLoadService
  ) {};

    ngOnInit() {
      this.clickEventsubscription = this.loadTreeListService.getClickEvent().subscribe(()=>{
          this.treelistservice.getData(this.loadTreeListService.getTools_projects_pkey()).subscribe(data => {
              this.loadTreelist(data)
        });
    });

     this.items = [
      {label:'Table', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}, 
      {label:'Index', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}, 
      {label:'SQL', icon: PrimeIcons.PLUS, command: (event) => this.addItem(this.selectedNode)}
    ];
  }

  addItem(node: any) {
    let keyarr = node.id.split('-') ;
    let key = keyarr[0];
    let type = keyarr[2];
    
    node = node;
    node = node;
  }

  onHide() {
    this.selectedNode = this.selectedNode;
    this.selectedId = '';
  }
  

  loadTreelist(data: any) {
      this.nodes = data;
  };
}

