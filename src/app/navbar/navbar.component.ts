import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  dropdownOpen = false;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.params.subscribe((params) => {
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

  switchtoWebShop() {
    this.router.navigate([this.currentLang, 'webshop']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.language-switcher')) {
      this.dropdownOpen = false;
    }

    if (!targetElement.closest('.menu-toggle') && !targetElement.closest('.nav-links.open')) {
      this.menuOpen = false;
    } 
  }
}
