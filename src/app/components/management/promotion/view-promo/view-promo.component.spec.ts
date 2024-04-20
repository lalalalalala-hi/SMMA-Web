import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromoComponent } from './view-promo.component';

describe('ViewPromoComponent', () => {
  let component: ViewPromoComponent;
  let fixture: ComponentFixture<ViewPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPromoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
