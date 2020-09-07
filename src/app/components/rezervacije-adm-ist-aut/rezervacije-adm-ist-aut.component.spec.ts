import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeAdmIstAutComponent } from './rezervacije-adm-ist-aut.component';

describe('RezervacijeAdmIstAutComponent', () => {
  let component: RezervacijeAdmIstAutComponent;
  let fixture: ComponentFixture<RezervacijeAdmIstAutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervacijeAdmIstAutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijeAdmIstAutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
