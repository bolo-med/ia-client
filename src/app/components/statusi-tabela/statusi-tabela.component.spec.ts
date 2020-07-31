import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusiTabelaComponent } from './statusi-tabela.component';

describe('StatusiTabelaComponent', () => {
  let component: StatusiTabelaComponent;
  let fixture: ComponentFixture<StatusiTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusiTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusiTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
