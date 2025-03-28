import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.css'],
})
export class DeliveryPageComponent implements OnInit {
  deliveryInfo = {
    name: '',
    address: '',
    city: '',
    houseNumber: '',
    postalCode: '',
    phone: '',
  };

  formSubmitted = false;
  currentLang: string = 'en';

  constructor(
    private router: Router,
    private http: HttpClient,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Figyeljük a nyelv változását az URL-ben
    this.route.params.subscribe((params) => {
      this.currentLang = params['lang'] || 'en';
      this.translate.use(this.currentLang); // Nyelv beállítása
    });
  }

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
    alert(this.translate.instant('Delivery information saved successfully!'));
  }
}