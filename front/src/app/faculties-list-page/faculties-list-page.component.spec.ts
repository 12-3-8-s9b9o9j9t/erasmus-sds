import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultiesListPageComponent } from './faculties-list-page.component';

describe('FacultiesListPageComponent', () => {
  let component: FacultiesListPageComponent;
  let fixture: ComponentFixture<FacultiesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultiesListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultiesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
