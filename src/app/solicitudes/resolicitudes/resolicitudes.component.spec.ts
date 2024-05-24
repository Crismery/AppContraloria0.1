import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolicitudesComponent } from './resolicitudes.component';

describe('ResolicitudesComponent', () => {
  let component: ResolicitudesComponent;
  let fixture: ComponentFixture<ResolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResolicitudesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
