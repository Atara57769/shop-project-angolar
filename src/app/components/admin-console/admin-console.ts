import { Component, inject } from '@angular/core';
import { ProductManagement } from './product-management/product-management';
import { OrdersManagement } from './orders-management/orders-management';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-admin-console',
  imports: [ProductManagement,OrdersManagement],
  templateUrl: './admin-console.html',
  styleUrl: './admin-console.scss',
})
export class AdminConsole {
prod:boolean=true;
orders:boolean=false;

isUpdating: boolean = false;
updateStatus: { success: boolean; message: string } | null = null;

private chatService = inject(ChatService);

showProducts(){
  this.prod=true;
  this.orders=false;
}
showOrders(){
  this.prod=false;
  this.orders=true;
}

updateVectorDb() {
  if (this.isUpdating) return;

  this.isUpdating = true;
  this.updateStatus = null;

  this.chatService.updateVectorDb().subscribe({
    next: (res) => {
      this.isUpdating = false;
      this.updateStatus = {
        success: true,
        message: res.message || 'Vector database successfully updated!'
      };
      this.autoDismissStatus();
    },
    error: (err) => {
      this.isUpdating = false;
      const errMsg = err.error?.message || err.error?.details || 'An unexpected error occurred.';
      this.updateStatus = {
        success: false,
        message: `Failed to update: ${errMsg}`
      };
      this.autoDismissStatus();
    }
  });
}

private autoDismissStatus() {
  setTimeout(() => {
    this.updateStatus = null;
  }, 5000);
}
}
