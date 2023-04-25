import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosePopupButtonComponent } from './close-popup-button.component';

describe('ClosePopupButtonComponent', () => {
  let component: ClosePopupButtonComponent;
  let fixture: ComponentFixture<ClosePopupButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosePopupButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosePopupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
