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

@Component({
  selector: 'app-edit-product',
  imports: [Select, FormsModule, Dialog, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct {
  frmProduct: FormGroup = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0.0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required])
  });
  @Input()
  currentId: number = -1;
  currentProduct!: ProductModel;
  close = output<void>();
  srvCategory: CategoryService = inject(CategoryService);
  categories: string[] = [];
  srvProducts: ProductService = inject(ProductService);
  previewUrl = '';
  filePath = '';
  private objectUrl?: string;

  ngOnInit() {
    this.categories = this.srvCategory.getCategoryNames();
  }
  ngOnChanges() {
    this.currentProduct = this.srvProducts.getProductById(this.currentId) ?? new ProductModel();
    this.refreshForm();
  }
  refreshForm() {
    this.frmProduct.setValue({
      id: this.currentProduct.id,
      name: this.currentProduct.name,
      price: this.currentProduct.price,
      description: this.currentProduct.description,
      category: this.currentProduct.categoryName,
      imgUrl: this.currentProduct.imageUrl
    });
    this.previewUrl = this.currentProduct.imageUrl;
    this.filePath = this.currentProduct.imageUrl;
  }

  saveProduct() {
    this.currentProduct.id = this.frmProduct.value.id;
    this.currentProduct.name = this.frmProduct.value.name;
    this.currentProduct.price = this.frmProduct.value.price;
    this.currentProduct.description = this.frmProduct.value.description;
    this.currentProduct.categoryName = this.frmProduct.value.category;
    this.currentProduct.imageUrl = this.previewUrl || this.frmProduct.value.imgUrl;
    this.srvProducts.updateProduct(this.currentProduct);
    this.hide();
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const path = input.value || '';
    if (!file) {
      this.filePath = '';
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
  hide() {
    //this.refreshForm();
    this.close.emit();
  }

}
