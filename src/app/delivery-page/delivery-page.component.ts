import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.css'],
})
export class DeliveryPageComponent {
  constructor(private router: Router, private http: HttpClient) {}
  deliveryInfo = {
    name: '',
    address: '',
    city: '',
    houseNumber: '',
    postalCode: '',
    phone: '',
  };

  formSubmitted = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmitted = true;
      console.log('Form Submitted!', form.value);

      // Szállítási adatok mentése vagy API hívás
      this.submitDeliveryInfo(form.value);

      // Üzenet eltüntetése pár másodperc után
      setTimeout(() => {
        this.formSubmitted = false;
      }, 3000);
    } else {
      console.log('Form Invalid!');
    }
  }

  validateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }

  validateNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  submitDeliveryInfo(value: any) {
    console.log('Delivery Information:', this.deliveryInfo);
    alert('Szállítási adatok sikeresen elmentve!');
  }
}
