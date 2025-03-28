import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css'
})
export class PricesComponent implements OnInit{
  currentLang: string = 'en';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Figyeljük a nyelv változását az URL-ben
    this.route.params.subscribe(params => {
      this.currentLang = params['lang'] || 'en';
      this.loadPriceList();
    });
  }

  loadPriceList(): void {
    console.log(`Loading price list for language: ${this.currentLang}`);
    // Itt töltsd be az árlistát a megfelelő nyelv alapján
  }
}
