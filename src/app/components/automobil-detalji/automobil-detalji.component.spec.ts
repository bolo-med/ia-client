import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobilDetaljiComponent } from './automobil-detalji.component';

describe('AutomobilDetaljiComponent', () => {
  let component: AutomobilDetaljiComponent;
  let fixture: ComponentFixture<AutomobilDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomobilDetaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobilDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
