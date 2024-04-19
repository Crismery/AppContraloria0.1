import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogousuarioComponent } from './dialogousuario.component';

describe('DialogousuarioComponent', () => {
  let component: DialogousuarioComponent;
  let fixture: ComponentFixture<DialogousuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogousuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
