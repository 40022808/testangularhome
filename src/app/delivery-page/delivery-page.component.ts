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
    email: '',
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

    // Email cím automatikus kitöltése
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.deliveryInfo.email = userEmail; // Az email mező automatikus kitöltése
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmitted = true;
      console.log('Form Submitted!', form.value);

      // Szállítási adatok mentése vagy API hívás
      this.http
        .post('http://localhost:8000/api/delivery', form.value)
        .subscribe(
          (response: any) => {
            console.log('Delivery details saved:', response);
          },
          (error) => {
            console.error('Error saving delivery details:', error);
          }
        );

      // Üzenet eltüntetése pár másodperc után
      setTimeout(() => {
        this.router.navigate(['/', this.currentLang, 'home']);
      }, 3000);
    } else {
      console.log('Form Invalid!');
    }
  }

  validateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Betűk (ékezetesek is), számok és szóközök engedélyezése
    input.value = input.value.replace(/[^a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]/g, '');
  }

  validateNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // Csak számok engedélyezése
    if (input.id === 'postalCode' && input.value.length > 4) {
      input.value = input.value.slice(0, 4); // Maximum 4 számjegy az irányítószámhoz
    } else if (input.id === 'phone' && input.value.length > 11) {
      input.value = input.value.slice(0, 11); // Maximum 11 számjegy a telefonszámhoz
    }
  }

  submitDeliveryInfo(value: any) {
    console.log('Delivery Information:', this.deliveryInfo);
    alert(this.translate.instant('Delivery information saved successfully!'));
  }
}
