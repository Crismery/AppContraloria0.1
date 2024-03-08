import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsignacionComponent } from './add-asignacion.component';

describe('AddAsignacionComponent', () => {
  let component: AddAsignacionComponent;
  let fixture: ComponentFixture<AddAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAsignacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
