import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeliTabelaComponent } from './modeli-tabela.component';

describe('ModeliTabelaComponent', () => {
  let component: ModeliTabelaComponent;
  let fixture: ComponentFixture<ModeliTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeliTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeliTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
