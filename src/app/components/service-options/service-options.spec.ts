import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceOptions } from './service-options';
import { Service } from '../../models/service';

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
  ],
};

describe('ServiceOptions', () => {
  let component: ServiceOptions;
  let fixture: ComponentFixture<ServiceOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOptions],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceOptions);
    fixture.componentRef.setInput('service', web);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
