import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeAdmKorComponent } from './rezervacije-adm-kor.component';

describe('RezervacijeAdmKorComponent', () => {
  let component: RezervacijeAdmKorComponent;
  let fixture: ComponentFixture<RezervacijeAdmKorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervacijeAdmKorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijeAdmKorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
