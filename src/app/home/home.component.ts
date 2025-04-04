import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  items = [1];

  @ViewChildren('child') children!: QueryList<ElementRef>;
  @ViewChildren('meteorContainer') meteorContainer!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang) {
        this.currentLang = lang;
        this.translate.use(lang);
      }
    });
  }

  currentLang = 'en';

  ngOnInit() {}

  ngAfterViewInit() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: isMobile ? 0.4 : 0.6
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          setTimeout(() => {
            if (element.classList.contains('divcontainer_III_text')) {
              element.classList.add('moveLeft');
            } else if (
              element.classList.contains('divcontainer') &&
              element.classList.contains('II')
            ) {
              element.classList.add('fadeInFromLeft');
            } 
            else if (element.classList.contains('shop')) {
              element.classList.add('fadeInAndGrow');
            }
            else if (element.classList.contains('divcontainer_V_div_block')) {
              setTimeout(() => {
                element.classList.add('shadow-inset-center');
              }, 500);
                           
            }
            else if (element.classList.contains('divcontainer_V_div')) {
              setTimeout(() => {
                element.classList.add('bounce-in-top');
              }, 1000);
              
            }
            else if (
              element.classList.contains('good1') ||
              element.classList.contains('good2') ||
              element.classList.contains('good3')
            ) {
              element.classList.add('slide-up2');
            } else {
              element.classList.add('slide-up');
            }
          }, index * 400);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.children.forEach(child => {
      observer.observe(child.nativeElement);
    });

    

  }



}
