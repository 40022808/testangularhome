import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent {
  product: any;
  selectedFile: File | null = null; // 添加选中的文件属性
  

  ngOnInit(): void {
    this.translate.use(this.currentLang);
    
  }
  currentLang = 'hu';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    private productService: ProductService,
    private translate: TranslateService,
    private http: HttpClient,
    private route: ActivatedRoute,
        private router: Router,
  ) {
    this.product = { ...data.product }; // 克隆商品数据，避免直接修改
    
      this.route.params.subscribe((params) => {
        const lang = params['lang'];
        if (lang) {
          this.currentLang = lang;
          this.translate.use(lang);
        }
      });
  }


  updateProduct(): void {
    this.productService.updateProduct(this.product.id, this.product).subscribe(
      (response: any) => {
        this.translate.get('PRODUCT_DETAILS.UPDATE_SUCCESS').subscribe((message: string) => {
          console.log(message);
        });
        this.dialogRef.close({ updatedProduct: true });
      },
      error => {
        this.translate.get('PRODUCT_DETAILS.UPDATE_ERROR').subscribe((message: string) => {
          console.error(message, error);
        });
      }
    );
  }
  
  

    

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id).subscribe(
      () => {
        this.translate.get('PRODUCT_DETAILS.DELETE_SUCCESS').subscribe((message: string) => {
          console.log(message);
        });
        this.dialogRef.close({ deletedProduct: true });
      },
      error => {
        this.translate.get('PRODUCT_DETAILS.DELETE_ERROR').subscribe((message: string) => {
          console.error(message, error);
        });
      }
    );
  }
}

