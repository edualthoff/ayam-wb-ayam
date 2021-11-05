import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasCrudComponent } from './caracteristicas-crud.component';

describe('CaracteristicasCrudComponent', () => {
  let component: CaracteristicasCrudComponent;
  let fixture: ComponentFixture<CaracteristicasCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaracteristicasCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicasCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
