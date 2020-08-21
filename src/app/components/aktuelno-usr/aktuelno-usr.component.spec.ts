import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktuelnoUsrComponent } from './aktuelno-usr.component';

describe('AktuelnoUsrComponent', () => {
  let component: AktuelnoUsrComponent;
  let fixture: ComponentFixture<AktuelnoUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktuelnoUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktuelnoUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
