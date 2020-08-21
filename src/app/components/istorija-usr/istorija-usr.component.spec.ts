import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstorijaUsrComponent } from './istorija-usr.component';

describe('IstorijaUsrComponent', () => {
  let component: IstorijaUsrComponent;
  let fixture: ComponentFixture<IstorijaUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstorijaUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstorijaUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
