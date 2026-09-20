import { subtotalOf } from './pricing';
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

describe('Feature: service subtotal', () => {
  describe('Scenario: a service without options', () => {
    it('Given SEO at 300 with no options, When its subtotal is calculated, Then it is 300', () => {
      expect(subtotalOf(seo, {})).toBe(300);
    });
  });

  describe('Scenario: a configurable service', () => {
    it('Given Web at 500 with options at 30, When 1 page and 3 languages are chosen, Then the subtotal is 620', () => {
      expect(subtotalOf(web, { pages: 1, languages: 3 })).toBe(620);
    });
  });

  describe('Scenario: an option without a quantity', () => {
    it('Given Web with only pages chosen, When its subtotal is calculated, Then the missing option adds nothing', () => {
      expect(subtotalOf(web, { pages: 2 })).toBe(560);
    });
  });
});
