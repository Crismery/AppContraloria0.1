import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoentradaComponent } from './dialogoentrada.component';

describe('DialogoentradaComponent', () => {
  let component: DialogoentradaComponent;
  let fixture: ComponentFixture<DialogoentradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoentradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoentradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
