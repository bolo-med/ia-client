import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobiliTableComponent } from './automobili-table.component';

describe('AutomobiliTableComponent', () => {
  let component: AutomobiliTableComponent;
  let fixture: ComponentFixture<AutomobiliTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomobiliTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobiliTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
