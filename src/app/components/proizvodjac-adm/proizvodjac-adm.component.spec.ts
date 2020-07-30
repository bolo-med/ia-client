import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodjacAdmComponent } from './proizvodjac-adm.component';

describe('ProizvodjacAdmComponent', () => {
  let component: ProizvodjacAdmComponent;
  let fixture: ComponentFixture<ProizvodjacAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodjacAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodjacAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
