import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoregistroComponent } from './dialogoregistro.component';

describe('DialogoregistroComponent', () => {
  let component: DialogoregistroComponent;
  let fixture: ComponentFixture<DialogoregistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoregistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
