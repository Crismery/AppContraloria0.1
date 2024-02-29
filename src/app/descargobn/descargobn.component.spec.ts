import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargobnComponent } from './descargobn.component';

describe('DescargobnComponent', () => {
  let component: DescargobnComponent;
  let fixture: ComponentFixture<DescargobnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescargobnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescargobnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
