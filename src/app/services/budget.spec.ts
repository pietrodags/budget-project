import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Budget } from './budget';
import { Catalog } from './catalog';
import { Service } from '../models/service';

const seo: Service = {
  id: 'seo',
  name: 'SEO',
  description: 'Optimització SEO',
  price: 300,
  options: [],
};

const web: Service = {
  id: 'web',
  name: 'Web',
  description: 'Web responsive',
  price: 500,
  options: [
    {
      id: 'pages',
      name: 'Nombre de pàgines',
      unitPrice: 30,
      min: 1,
      info: { title: 'Pàgines', text: 'Cada pàgina costa 30 €' },
    },
    {
      id: 'languages',
      name: "Nombre d'idiomes",
      unitPrice: 30,
      min: 1,
      info: { title: 'Idiomes', text: 'Cada idioma costa 30 €' },
    },
  ],
};

describe('Feature: building a budget', () => {
  let budget: Budget;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Catalog, useValue: { services: signal([seo, web]) } }],
    });

    budget = TestBed.inject(Budget);
  });

  describe('Scenario: selecting a service without options', () => {
    it('Given an empty budget, When SEO is selected, Then the total is 300', () => {
      budget.toggle('seo');

      expect(budget.total()).toBe(300);
    });
  });

  describe('Scenario: selecting a configurable service', () => {
    it('Given an empty budget, When Web is selected, Then its options start at their minimum and the total is 560', () => {
      budget.toggle('web');

      expect(budget.quantityOf('web', 'pages')).toBe(1);
      expect(budget.quantityOf('web', 'languages')).toBe(1);
      expect(budget.total()).toBe(560);
    });
  });

  describe('Scenario: raising a quantity', () => {
    it('Given Web selected, When the languages go up to 3, Then the total is 620', () => {
      budget.toggle('web');
      budget.increase('web', 'languages');
      budget.increase('web', 'languages');

      expect(budget.total()).toBe(620);
    });
  });

  describe('Scenario: a quantity already at its minimum', () => {
    it('Given Web selected with 1 page, When the pages are decreased, Then the quantity stays at 1', () => {
      budget.toggle('web');
      budget.decrease('web', 'pages');

      expect(budget.quantityOf('web', 'pages')).toBe(1);
    });
  });

  describe('Scenario: unselecting a service', () => {
    it('Given Web selected with 3 languages, When it is unselected and selected again, Then the quantities are back to the minimum', () => {
      budget.toggle('web');
      budget.increase('web', 'languages');
      budget.increase('web', 'languages');
      budget.toggle('web');
      budget.toggle('web');

      expect(budget.quantityOf('web', 'languages')).toBe(1);
    });
  });

  describe('Scenario: adding up several services', () => {
    it('Given SEO and Web selected, When the total is read, Then it adds both subtotals', () => {
      budget.toggle('seo');
      budget.toggle('web');

      expect(budget.total()).toBe(860);
    });
  });

  describe('Scenario: the lines copy the catalog', () => {
    it('Given SEO selected, When the lines are read, Then they carry the name and the base price', () => {
      budget.toggle('seo');

      const [line] = budget.lines();

      expect(line.serviceName).toBe('SEO');
      expect(line.basePrice).toBe(300);
      expect(line.subtotal).toBe(300);
    });
  });

  describe('Scenario: clearing the selection', () => {
    it('Given SEO selected, When the budget is cleared, Then the total is back to 0', () => {
      budget.toggle('seo');
      budget.clear();

      expect(budget.total()).toBe(0);
      expect(budget.selected().length).toBe(0);
    });
  });
});
