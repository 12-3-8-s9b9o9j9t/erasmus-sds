import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlaPageComponent } from './ola-page.component';

describe('OlaPageComponent', () => {
  let component: OlaPageComponent;
  let fixture: ComponentFixture<OlaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
