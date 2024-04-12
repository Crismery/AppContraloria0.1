import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorradorComponent } from './borrador.component';

describe('BorradorComponent', () => {
  let component: BorradorComponent;
  let fixture: ComponentFixture<BorradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
