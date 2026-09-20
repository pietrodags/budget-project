import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BudgetList } from './budget-list';
import { BudgetHistory } from '../../services/budget-history';

describe('Feature: searching and sorting the history', () => {
  let fixture: ComponentFixture<BudgetList>;

  const shownNames = (): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.budget-card__name')).map((element) =>
      (element as HTMLElement).textContent!.trim(),
    );

  const sortBy = (label: string): void => {
    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('.budget-list__sort-button'),
    ) as HTMLButtonElement[];

    buttons.find((button) => button.textContent!.includes(label))!.click();
    fixture.detectChanges();
  };

  const searchFor = (text: string): void => {
    const input = fixture.nativeElement.querySelector('#budget-search') as HTMLInputElement;

    input.value = text;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetList],
      providers: [provideRouter([])],
    }).compileComponents();

    const history = TestBed.inject(BudgetHistory);

    history.save({ name: 'Joan Farrés', phone: '666666667', email: 'joan@correu.cat' }, [], 980);
    history.save({ name: 'Ona Costa', phone: '666666666', email: 'ona@correu.cat' }, [], 400);

    fixture = TestBed.createComponent(BudgetList);
    fixture.detectChanges();
  });

  describe('Scenario: the default order', () => {
    it('Given two saved budgets, When the list is shown, Then the newest comes first', () => {
      expect(shownNames()).toEqual(['Ona Costa', 'Joan Farrés']);
    });
  });

  describe('Scenario: sorting by amount', () => {
    it('Given two saved budgets, When sorting by amount, Then the most expensive comes first', () => {
      sortBy('Import');

      expect(shownNames()).toEqual(['Joan Farrés', 'Ona Costa']);
    });
  });

  describe('Scenario: sorting by name', () => {
    it('Given two saved budgets, When sorting by name, Then they are in alphabetical order', () => {
      sortBy('Nom');

      expect(shownNames()).toEqual(['Joan Farrés', 'Ona Costa']);
    });
  });

  describe('Scenario: searching by name', () => {
    it('Given two saved budgets, When searching for "ona", Then only Ona Costa is shown', () => {
      searchFor('ona');

      expect(shownNames()).toEqual(['Ona Costa']);
    });
  });

  describe('Scenario: a search without results', () => {
    it('Given two saved budgets, When searching for a missing name, Then an empty message is shown', () => {
      searchFor('zzz');

      expect(shownNames()).toEqual([]);
      expect(fixture.nativeElement.querySelector('.budget-list__empty')).toBeTruthy();
    });
  });
});
