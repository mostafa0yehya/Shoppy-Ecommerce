import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlisButtonComponent } from './wishlis-button.component';

describe('WishlisButtonComponent', () => {
  let component: WishlisButtonComponent;
  let fixture: ComponentFixture<WishlisButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlisButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlisButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
