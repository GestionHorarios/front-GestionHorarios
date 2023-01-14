import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAsignaccionComponent } from './new-asignaccion.component';

describe('NewAsignaccionComponent', () => {
  let component: NewAsignaccionComponent;
  let fixture: ComponentFixture<NewAsignaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAsignaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAsignaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
