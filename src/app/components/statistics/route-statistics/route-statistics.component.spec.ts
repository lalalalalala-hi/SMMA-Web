import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteStatisticsComponent } from './route-statistics.component';

describe('RouteStatisticsComponent', () => {
  let component: RouteStatisticsComponent;
  let fixture: ComponentFixture<RouteStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
