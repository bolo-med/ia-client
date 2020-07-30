import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProModStaAdmComponent } from './pro-mod-sta-adm.component';

describe('ProModStaAdmComponent', () => {
  let component: ProModStaAdmComponent;
  let fixture: ComponentFixture<ProModStaAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProModStaAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProModStaAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
