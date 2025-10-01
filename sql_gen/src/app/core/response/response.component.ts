import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { ResponseService } from './response.service'
import { ResponseInterface } from './response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'toast-response-component',
  imports: [Toast],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css',
  standalone:true,
  providers: [MessageService],
})


export class ResponseComponent {
    clickEventsubscription:Subscription;

    constructor(private messageService: MessageService,
      private responseservice: ResponseService 
    ) {
      
      this.clickEventsubscription=    this.responseservice.getResponse().subscribe((response)=>{
        this.showToast(response);
      })

    };

    showToast(response:ResponseInterface, showSuccess:number = 1) {
      if (response.result === 1 && showSuccess === 1) {
          this.messageService.add({
            severity: 'success', summary: 'Success', detail: 'Operation successful'
          });
      } else if (response.result === 0) {
        let mess = (response.data as unknown) as string;
         this.messageService.add({
          severity: 'error', summary: 'Error', detail: mess, sticky: true 
        });
      }
    }
}
