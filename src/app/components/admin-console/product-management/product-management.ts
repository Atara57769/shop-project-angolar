import { Component, inject } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EditProduct } from './edit-product/edit-product';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category-service';
import { CategoryModel } from '../../../models/category-model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProdact } from './add-prodact/add-prodact';
@Component({
  selector: 'app-product-management',
  imports: [Dialog, ButtonModule, InputTextModule, EditProduct, ConfirmDialog, ToastModule, CommonModule, ReactiveFormsModule,AddProdact],
  templateUrl: './product-management.html',
  styleUrl: './product-management.scss',
  providers: [ConfirmationService, MessageService]
})
export class ProductManagement {
  srvProducts: ProductService = inject(ProductService);
  srvCategory: CategoryService = inject(CategoryService);
  products: ProductModel[] = [];
  categories: CategoryModel[] = [];
  visible: boolean = false;
  visibleAdd: boolean = false;
  selectedProduct: number = -1;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.srvProducts.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to load products' 
        });
      }
    });
  }

  hideDialog() {
    this.visible = false;
    this.loadProducts();
  }
  editProduct(id: number) {
    this.selectedProduct = id;
    this.visible = true;
  }
  deleteProduct(productId: number) {
    this.srvProducts.deleteProductById(productId).subscribe({
      next: () => {
        this.loadProducts();
        this.visible = false;
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to delete product' 
        });
      }
    });
  }
  confirm2(event: Event, id: number) {
    this.confirmationService.confirm({

      target: event.target as EventTarget,
      message: 'Delete this product?',
      header: 'Confirm deletion',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
        
      },

      accept: () => {
        this.deleteProduct(id);
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Product deleted successfully.' });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Delete action cancelled.',
          life: 3000,
        });
      },
    });
  }
  addProduct() {
    this.visibleAdd = true;
  }
  hideAddDialog() {
    this.visibleAdd = false;
    this.loadProducts();
  }

}
