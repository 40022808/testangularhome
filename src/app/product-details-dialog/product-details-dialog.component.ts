import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent {
  product: any;
  selectedFile: File | null = null; // 添加选中的文件属性

  


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    private productService: ProductService
  ) {
    this.product = { ...data.product }; // 克隆商品数据，避免直接修改
    
  }


  updateProduct(): void {
  
    console.log(this.product.description)
    this.productService.updateProduct(this.product.id, this.product).subscribe(
  
      (response: any) => {
        console.log(this.product)
        console.log('商品更新成功:', response);
        this.dialogRef.close({ updatedProduct: true });
      },
      error => {
        console.error('更新商品时发生错误:', error);
      }
    );
    
    
  }
  
  

    

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id).subscribe(
      () => {
        console.log('商品删除成功');
        this.dialogRef.close({ deletedProduct: true });
      },
      error => {
        console.error('删除商品时发生错误:', error);
      }
    );
  }


}

