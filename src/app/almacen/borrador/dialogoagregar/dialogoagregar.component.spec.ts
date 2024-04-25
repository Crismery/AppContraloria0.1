import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoagregarComponent } from './dialogoagregar.component';

describe('DialogoagregarComponent', () => {
  let component: DialogoagregarComponent;
  let fixture: ComponentFixture<DialogoagregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoagregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoagregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
