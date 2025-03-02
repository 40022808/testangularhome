import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
<<<<<<< HEAD
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

=======
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
>>>>>>> 033531b (Webshop)
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnInit() {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      this.currentLang = storedLang;
      this.translate.use(storedLang);
    } else {
      this.router.navigate([this.currentLang, 'home']);
    }
  }

  currentLang = 'en';

<<<<<<< HEAD
  constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
    this.route.params.subscribe(params => {
=======
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.params.subscribe((params) => {
>>>>>>> 033531b (Webshop)
      const lang = params['lang'];
      if (lang) {
        this.currentLang = lang;
        this.translate.use(lang);
        localStorage.setItem('language', lang);
      }
    });
  }

  switchLang(lang: string) {
    const currentUrl = this.router.url;
    const newUrl = currentUrl.replace(`/${this.currentLang}`, `/${lang}`);

    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);

    this.router.navigateByUrl(newUrl);
  }

<<<<<<< HEAD
}

=======
  switchtoWebShop() {
    this.router.navigate([this.currentLang, 'webshop']);
  }
}
>>>>>>> 033531b (Webshop)
