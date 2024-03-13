import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistrosComponent } from './add-registros.component';

describe('AddRegistrosComponent', () => {
  let component: AddRegistrosComponent;
  let fixture: ComponentFixture<AddRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRegistrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
