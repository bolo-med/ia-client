import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodaciUsrComponent } from './podaci-usr.component';

describe('PodaciUsrComponent', () => {
  let component: PodaciUsrComponent;
  let fixture: ComponentFixture<PodaciUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodaciUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodaciUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
