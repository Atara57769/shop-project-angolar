import { Component, inject, Input, output, ViewChild } from '@angular/core';
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
import { PostProductModel } from '../../../../models/post-product-model';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FileSelectEvent } from 'primeng/fileupload';
@Component({
  selector: 'app-add-prodact',
  imports: [Select, FormsModule, ToggleButtonModule,Dialog, ButtonModule, InputTextModule, ReactiveFormsModule,FileUploadModule   ],
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
    imgUrl: new FormControl('', [Validators.required]),
    isAvailable: new FormControl(true)
  });
  srvProducts = inject(ProductService);
  close = output<void>();
  srvCategory: CategoryService = inject(CategoryService);
  categories: string[] = [];
  categoriesObj:CategoryModel[] = [];
  previewUrl: string = '';
  uploading = false;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(private messageService: MessageService) {}
  ngOnInit() {
    this.srvCategory.getCategories().subscribe({
      next: (res) => {
        this.categoriesObj = res;
        this.categories = res.map(c => c.name);
      },
      error: (err) => {
        this.categoriesObj = [];
        this.categories = [];
      }
    });
     this.refresh()
  }

onFileSelected(event: FileSelectEvent) {

  const file = event.files[0];
  if (!file) return;

  this.previewUrl = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append('file', file);

  this.uploading = true;

  this.srvProducts.uploadImage(formData).subscribe({
    next: (res) => {
      this.frmProduct.patchValue({
        imgUrl: res.url
      });
      this.uploading = false;
    },
    error: () => this.uploading = false
  });
}


 saveProduct() {

  if (!this.frmProduct.value.imgUrl) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Image missing',
      detail: 'Please upload an image first'
    });
    return;
  }

  const product: PostProductModel = {
    id: this.frmProduct.value.id,
    name: this.frmProduct.value.name,
    price: this.frmProduct.value.price,
    description: this.frmProduct.value.description,
    categoryId: this.srvCategory.getIdByName(
      this.frmProduct.value.category,
      this.categoriesObj
    ),
    imageUrl: this.frmProduct.value.imgUrl, 
    isAvailable: this.frmProduct.value.isAvailable
  };

  this.srvProducts.addProduct(product).subscribe({
    next: () => {

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product added successfully'
      });

      this.hide();
      this.refresh();
    },

    error: (err) => {
      console.error(err);

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err?.error?.message || 'Failed to add product'
      });
    }
  });
}
  hide() {
    this.refresh();
    this.close.emit();
  } 
  refresh() {
   this.frmProduct.reset({
    name: '',
    price: 0,
    description: '',
    category: '',
    imgUrl: '',
    isAvailable: true
  });
  this.previewUrl = '';
   this.fileUpload?.clear();  
  }
  
  
}
