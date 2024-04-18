import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinodialogoComponent } from './sinodialogo.component';

describe('SinodialogoComponent', () => {
  let component: SinodialogoComponent;
  let fixture: ComponentFixture<SinodialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinodialogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinodialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
