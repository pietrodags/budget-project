import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BudgetDetail } from './budget-detail';

describe('BudgetDetail', () => {
  let component: BudgetDetail;
  let fixture: ComponentFixture<BudgetDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetDetail);
    fixture.componentRef.setInput('id', 'missing-id');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
