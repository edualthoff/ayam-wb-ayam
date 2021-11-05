import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletProdutoComponent } from './outlet-produto.component';

describe('OutletProdutoComponent', () => {
  let component: OutletProdutoComponent;
  let fixture: ComponentFixture<OutletProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
