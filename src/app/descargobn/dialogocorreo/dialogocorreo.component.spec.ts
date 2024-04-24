import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogocorreoComponent } from './dialogocorreo.component';

describe('DialogocorreoComponent', () => {
  let component: DialogocorreoComponent;
  let fixture: ComponentFixture<DialogocorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogocorreoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogocorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
