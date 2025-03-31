import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css'],
})
export class EditProductDialogComponent {
  editForm: FormGroup;
  ngOnInit(): void {
    this.translate.use(this.currentLang); // Nyelv beállítása
  }
  currentLang = 'en';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
     private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]],
      description: [data.description],
    });
  }

  save(): void {
    if (this.editForm.valid) {
      console.log('Dialog form data:', this.editForm.value); // Debugging: Log the form data
      this.dialogRef.close(this.editForm.value); // Pass the updated product data back
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
