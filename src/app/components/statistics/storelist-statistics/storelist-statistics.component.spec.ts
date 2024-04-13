import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorelistStatisticsComponent } from './storelist-statistics.component';

describe('StorelistStatisticsComponent', () => {
  let component: StorelistStatisticsComponent;
  let fixture: ComponentFixture<StorelistStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorelistStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorelistStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
