import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  items = [1];

  @ViewChildren('child') children!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    this.children.forEach(child => {
      observer.observe(child.nativeElement);
    });
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
  

}
