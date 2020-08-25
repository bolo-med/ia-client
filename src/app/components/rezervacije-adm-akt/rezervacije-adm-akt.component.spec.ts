import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeAdmAktComponent } from './rezervacije-adm-akt.component';

describe('RezervacijeAdmAktComponent', () => {
  let component: RezervacijeAdmAktComponent;
  let fixture: ComponentFixture<RezervacijeAdmAktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervacijeAdmAktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijeAdmAktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
