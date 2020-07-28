import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobilObrazacAdmComponent } from './automobil-obrazac-adm.component';

describe('AutomobilObrazacAdmComponent', () => {
  let component: AutomobilObrazacAdmComponent;
  let fixture: ComponentFixture<AutomobilObrazacAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomobilObrazacAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobilObrazacAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
