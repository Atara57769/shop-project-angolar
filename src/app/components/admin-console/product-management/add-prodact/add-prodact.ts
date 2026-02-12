import { Component, inject, Input, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../../../../models/product-model';
import { ProductService } from '../../../../services/product-service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { CategoryService } from '../../../../services/category-service';
import { CategoryModel } from '../../../../models/category-model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-prodact',
  imports: [Select, FormsModule, Dialog, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './add-prodact.html',
  styleUrl: './add-prodact.scss',
  providers: [MessageService]
})
export class AddProdact {
  frmProduct: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0.0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required])
  });
  srvProducts = inject(ProductService);
  close = output<void>();
  srvCategory: CategoryService = inject(CategoryService);
  categories: string[] = [];
  previewUrl = '';
  filePath = '';
  private objectUrl?: string;
  constructor(private messageService: MessageService) {}
  ngOnInit() {
    this.categories = this.srvCategory.getCategoryNames();
    this.refresh();
  }
  saveProduct() {
    const newProduct = new ProductModel();
    newProduct.id = 0;
    newProduct.name = this.frmProduct.value.name;
    newProduct.price = this.frmProduct.value.price;
    newProduct.description = this.frmProduct.value.description;
    newProduct.categoryName = this.frmProduct.value.category;
    newProduct.imageUrl = this.previewUrl || this.frmProduct.value.imgUrl;
    newProduct.isAvailable = true;
    this.srvProducts.addProduct(newProduct);
    this.hide();
    this.refresh();
  }
  hide() {
    this.refresh();
    this.close.emit();
  } 
  refresh() {
    this.frmProduct.reset();
    this.revokePreview();
    this.previewUrl = '';
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const path = input.value || '';
    if (!file) {
      this.filePath = '';
      this.frmProduct.patchValue({ imgUrl: '' });
      return;
    }
    this.revokePreview();
    this.objectUrl = URL.createObjectURL(file);
    this.previewUrl = this.objectUrl;
    this.filePath = path;
    this.frmProduct.patchValue({ imgUrl: path });
  }
  private revokePreview() {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = undefined;
    }
  }
  
}
