import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetTotal } from './budget-total';

describe('BudgetTotal', () => {
  let component: BudgetTotal;
  let fixture: ComponentFixture<BudgetTotal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetTotal],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetTotal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
