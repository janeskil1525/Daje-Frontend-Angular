import { Component, input } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { MenuItem } from 'primeng/api';
import { TreelistService } from '../../core/treelist/treelist.service';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
  selector: 'p-object-treelist',
  imports: [TreeModule, ContextMenuModule],
  templateUrl: './treelist.html',
  styleUrl: './treelist.css'
})

export class TreelistComponent {
  selectedNode: string = "";
  nodes:any;

   constructor(private treelistservice: TreelistService) {};
  items: MenuItem[] = [{label:'Table'}, {label:'Index'}, {label:'SQL'}];

 /*  loadTreelist(tools_projects_pkey: number) {
    this.treelistservice.getData(tools_projects_pkey).subscribe((data) => {
        this.nodes = data;
  }); */

};

