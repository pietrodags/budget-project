import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceOptions } from './service-options';

describe('ServiceOptions', () => {
  let component: ServiceOptions;
  let fixture: ComponentFixture<ServiceOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOptions],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceOptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
