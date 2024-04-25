import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoBNComponent } from './dialogo-bn.component';

describe('DialogoBNComponent', () => {
  let component: DialogoBNComponent;
  let fixture: ComponentFixture<DialogoBNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoBNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoBNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
