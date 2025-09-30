import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'toast-response-component',
  imports: [Toast],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css',
  standalone:true,
  providers: [MessageService]
})

constructor(private messageService: MessageService) {}

export class ResponseComponent {

}
