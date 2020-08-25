import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeAdmComponent } from './rezervacije-adm.component';

describe('RezervacijeAdmComponent', () => {
  let component: RezervacijeAdmComponent;
  let fixture: ComponentFixture<RezervacijeAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervacijeAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijeAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
