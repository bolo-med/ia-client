import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LozinkaUsrComponent } from './lozinka-usr.component';

describe('LozinkaUsrComponent', () => {
  let component: LozinkaUsrComponent;
  let fixture: ComponentFixture<LozinkaUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LozinkaUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LozinkaUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
