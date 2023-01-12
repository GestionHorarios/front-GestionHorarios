import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaccionComponent } from './asignaccion.component';

describe('AsignaccionComponent', () => {
  let component: AsignaccionComponent;
  let fixture: ComponentFixture<AsignaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
