import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.css'],
})
export class DeliveryPageComponent {
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

  submitDeliveryInfo() {
    console.log('Delivery Information:', this.deliveryInfo);
  }
}
