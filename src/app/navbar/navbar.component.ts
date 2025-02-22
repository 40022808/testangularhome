import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnInit() {
    this.router.navigate([this.currentLang, 'home']);
  }

  currentLang = 'en';

  constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang) {
        this.currentLang = lang;
        this.translate.use(lang);
      }
    });
  }

  switchLang(lang: string) {
    
    const currentUrl = this.router.url;

    
    const newUrl = currentUrl.replace(`/${this.currentLang}`, `/${lang}`);

    
    this.currentLang = lang;
    this.translate.use(lang);

    
    this.router.navigateByUrl(newUrl);
  }

}
