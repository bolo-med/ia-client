import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAdmComponent } from './status-adm.component';

describe('StatusAdmComponent', () => {
  let component: StatusAdmComponent;
  let fixture: ComponentFixture<StatusAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
