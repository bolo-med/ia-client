import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobiliComponent } from './automobili.component';

describe('AutomobiliComponent', () => {
  let component: AutomobiliComponent;
  let fixture: ComponentFixture<AutomobiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomobiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
