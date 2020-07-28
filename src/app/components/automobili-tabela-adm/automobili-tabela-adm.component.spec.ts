import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobiliTabelaAdmComponent } from './automobili-tabela-adm.component';

describe('AutomobiliTabelaAdmComponent', () => {
  let component: AutomobiliTabelaAdmComponent;
  let fixture: ComponentFixture<AutomobiliTabelaAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomobiliTabelaAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobiliTabelaAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
