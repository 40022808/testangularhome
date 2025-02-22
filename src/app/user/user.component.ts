import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  ngOnInit() {
        this.router.navigate([this.currentLang, 'user']);
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
}
