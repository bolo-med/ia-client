import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IznajmljivanjeUsrComponent } from './iznajmljivanje-usr.component';

describe('IznajmljivanjeUsrComponent', () => {
  let component: IznajmljivanjeUsrComponent;
  let fixture: ComponentFixture<IznajmljivanjeUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IznajmljivanjeUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IznajmljivanjeUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
