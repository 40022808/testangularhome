import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshopPageComponent } from './webshop-page.component';

describe('WebshopPageComponent', () => {
  let component: WebshopPageComponent;
  let fixture: ComponentFixture<WebshopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebshopPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebshopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
