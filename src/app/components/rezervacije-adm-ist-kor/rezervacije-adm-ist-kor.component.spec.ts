import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeAdmIstKorComponent } from './rezervacije-adm-ist-kor.component';

describe('RezervacijeAdmIstKorComponent', () => {
  let component: RezervacijeAdmIstKorComponent;
  let fixture: ComponentFixture<RezervacijeAdmIstKorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervacijeAdmIstKorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijeAdmIstKorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
