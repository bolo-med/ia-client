import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeAdmIstComponent } from './rezervacije-adm-ist.component';

describe('RezervacijeAdmIstComponent', () => {
  let component: RezervacijeAdmIstComponent;
  let fixture: ComponentFixture<RezervacijeAdmIstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervacijeAdmIstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijeAdmIstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
