import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodjaciTabelaComponent } from './proizvodjaci-tabela.component';

describe('ProizvodjaciTabelaComponent', () => {
  let component: ProizvodjaciTabelaComponent;
  let fixture: ComponentFixture<ProizvodjaciTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodjaciTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodjaciTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
