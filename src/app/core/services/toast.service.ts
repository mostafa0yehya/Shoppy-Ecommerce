import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}
  showError(errorMessage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
      styleClass: 'my-custom-toast',
    });
  }
  showSucess(success: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucess',
      detail: success,
    });
  }
}
