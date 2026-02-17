import { ChangeDetectorRef, Component, inject, Input, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';

import { ProductModel } from '../../../../models/product-model';
import { PostProductModel } from '../../../../models/post-product-model';
import { CategoryModel } from '../../../../models/category-model';

import { ProductService } from '../../../../services/product-service';
import { CategoryService } from '../../../../services/category-service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    Select,
    FormsModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToggleButtonModule,
    FileUploadModule
  ],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss'
})
export class EditProduct {

  frmProduct: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
    categoryName: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    isAvailable: new FormControl(true)
  });

  @Input() currentId: number = -1;
  close = output<void>();

  currentProduct!: ProductModel;

  srvProducts = inject(ProductService);
  srvCategory = inject(CategoryService);
  cdr = inject(ChangeDetectorRef);

  categories: string[] = [];
  categoriesObj: CategoryModel[] = [];

  // ⭐ תמונה לתצוגה
  previewUrl: string = '';
  uploading = false;

  // ================= INIT =================

  ngOnInit() {
    this.srvCategory.getCategories().subscribe({
      next: (res) => {
        this.categoriesObj = res;
        this.categories = res.map(c => c.name);
      },
      error: () => {
        this.categoriesObj = [];
        this.categories = [];
      }
    });
  }

  ngOnChanges() {
    if (this.currentId && this.currentId !== -1) {
      this.srvProducts.getProductById(this.currentId).subscribe({
        next: (product) => {
          this.currentProduct = product;
          this.refreshForm();
        },
        error: () => {
          this.currentProduct = new ProductModel();
          this.refreshForm();
        }
      });
    }
  }

  // ================= LOAD FORM =================

  refreshForm() {
    this.frmProduct.setValue({
      id: this.currentProduct.id,
      name: this.currentProduct.name,
      price: this.currentProduct.price,
      description: this.currentProduct.description,
      categoryName: this.currentProduct.categoryName,
      imageUrl: this.currentProduct.imageUrl,
      isAvailable: this.currentProduct.isAvailable
    });

    //  מציג תמונה קיימת
    this.previewUrl = this.currentProduct.imageUrl;
  }

  // ================= IMAGE UPLOAD =================

  onFileSelected(event: FileSelectEvent) {
console.log("PRODUCT:", this.currentProduct);
  console.log("IMAGE:", this.currentProduct.imageUrl);
    const file = event.files[0];
    if (!file) return;
    // preview מיידי
    this.previewUrl = URL.createObjectURL(file);
this.cdr.detectChanges();
    const formData = new FormData();
    formData.append('file', file);

    this.uploading = true;

    this.srvProducts.uploadImage(formData).subscribe({
      next: (res: any) => {

        // עדכון URL בטופס
       this.frmProduct.patchValue({
  imageUrl: res.url
});

        this.uploading = false;
      },
      error: () => this.uploading = false
    });
  }

  // ================= SAVE =================

  saveProduct() {

    const product: PostProductModel = {
      id: this.frmProduct.value.id,
      name: this.frmProduct.value.name,
      price: this.frmProduct.value.price,
      description: this.frmProduct.value.description,
      categoryId: this.srvCategory.getIdByName(
        this.frmProduct.value.categoryName,
        this.categoriesObj
      ),
      imageUrl: this.frmProduct.value.imageUrl,
      isAvailable: this.frmProduct.value.isAvailable
    };

    this.srvProducts.updateProduct(product).subscribe({
      next: () => {
        console.log('Product updated successfully');
        this.hide();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update product');
      }
    });
  }

  // ================= CLOSE =================

  hide() {
    this.close.emit();
  }
}