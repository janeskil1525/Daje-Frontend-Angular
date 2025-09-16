import { Component, input, OnInit } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { MenuItem } from 'primeng/api';
import { TreelistService } from '../../core/treelist/treelist.service';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TreelistLoadService } from '../../core/treelist/treelist.load.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'p-object-treelist',
  imports: [TreeModule, ContextMenuModule],
  templateUrl: './treelist.html',
  styleUrl: './treelist.css'
})

export class TreelistComponent{
  selectedNode: string = "";
  nodes:any;

  clickEventsubscription!:Subscription;
 

   constructor(
    private treelistservice: TreelistService, 
    private loadTreeListService: TreelistLoadService
  ) {};
    ngOnInit() {
      this.clickEventsubscription = this.loadTreeListService.getClickEvent().subscribe(()=>{
          this.treelistservice.getData(1).subscribe(data => {
              this.loadTreelist(data)
        });;
    });
  }
  items: MenuItem[] = [{label:'Table'}, {label:'Index'}, {label:'SQL'}];

 /*  loadTreelist(tools_projects_pkey: number) {
    this.treelistservice.getData(tools_projects_pkey).subscribe((data) => {
        this.nodes = data;
  }); */

  loadTreelist(data: any) {
      this.nodes.set( data );
  };
}

