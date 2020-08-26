import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeAdmAutComponent } from './rezervacije-adm-aut.component';

describe('RezervacijeAdmAutComponent', () => {
  let component: RezervacijeAdmAutComponent;
  let fixture: ComponentFixture<RezervacijeAdmAutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervacijeAdmAutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijeAdmAutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
