import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobiliAdmComponent } from './automobili-adm.component';

describe('AutomobiliAdmComponent', () => {
  let component: AutomobiliAdmComponent;
  let fixture: ComponentFixture<AutomobiliAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomobiliAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobiliAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
