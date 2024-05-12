import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiDataComponent } from './wifi-data.component';

describe('WifiDataComponent', () => {
  let component: WifiDataComponent;
  let fixture: ComponentFixture<WifiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WifiDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WifiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
