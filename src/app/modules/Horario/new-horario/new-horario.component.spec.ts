import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHorarioComponent } from './new-horario.component';

describe('NewHorarioComponent', () => {
  let component: NewHorarioComponent;
  let fixture: ComponentFixture<NewHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
