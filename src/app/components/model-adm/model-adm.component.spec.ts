import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAdmComponent } from './model-adm.component';

describe('ModelAdmComponent', () => {
  let component: ModelAdmComponent;
  let fixture: ComponentFixture<ModelAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
