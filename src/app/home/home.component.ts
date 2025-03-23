import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  Renderer2
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private translate: TranslateService,
    private renderer: Renderer2
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
            } else if (element.classList.contains('shop')) {
              element.classList.add('fadeInAndGrow');
            } else if (
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

    // 开始流星雨效果
    this.startMeteorRain();
  }

  startMeteorRain(): void {
    const container = this.meteorContainer.first.nativeElement;

    // 每隔 500ms 创建一个流星
    setInterval(() => {
      this.createMeteor(container);
    }, 500);
  }

  createMeteor(container: HTMLElement): void {
    const meteor = this.renderer.createElement('div');
    this.renderer.addClass(meteor, 'meteor');

    // 设置流星的随机位置和动画延迟
    const startLeft = Math.random() * container.offsetWidth;
    const delay = Math.random() * 2;

    this.renderer.setStyle(meteor, 'left', `${startLeft}px`);
    this.renderer.setStyle(meteor, 'animationDelay', `${delay}s`);

    // 添加流星到容器中
    this.renderer.appendChild(container, meteor);

    // 动画完成后移除流星
    setTimeout(() => {
      this.renderer.removeChild(container, meteor);
    }, 3000);
  }
}
