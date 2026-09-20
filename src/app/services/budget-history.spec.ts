import { TestBed } from '@angular/core/testing';
import { BudgetHistory } from './budget-history';
import { Client } from '../models/client';

const ona: Client = { name: 'Ona Costa', phone: '666666666', email: 'ona@correu.cat' };
const joan: Client = { name: 'Joan Farrés', phone: '666666667', email: 'joan@correu.cat' };

describe('Feature: budget history', () => {
  let history: BudgetHistory;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    history = TestBed.inject(BudgetHistory);
  });

  describe('Scenario: saving a budget', () => {
    it('Given an empty history, When a budget is saved, Then it gets an id and a creation date', () => {
      history.save(ona, [], 980);

      const [saved] = history.saved();

      expect(saved.id).toBeTruthy();
      expect(saved.createdAt).toBeTruthy();
      expect(saved.client.name).toBe('Ona Costa');
      expect(saved.total).toBe(980);
    });
  });

  describe('Scenario: saving several budgets', () => {
    it('Given one saved budget, When another one is saved, Then the newest comes first', () => {
      history.save(ona, [], 980);
      history.save(joan, [], 700);

      expect(history.saved().map((budget) => budget.client.name)).toEqual([
        'Joan Farrés',
        'Ona Costa',
      ]);
    });
  });

  describe('Scenario: every budget is identified', () => {
    it('Given two saved budgets, When their ids are compared, Then they are different', () => {
      history.save(ona, [], 980);
      history.save(joan, [], 700);

      const [first, second] = history.saved();

      expect(first.id).not.toBe(second.id);
    });
  });
});
