import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoDialog } from './info-dialog';

describe('InfoDialog', () => {
  let component: InfoDialog;
  let fixture: ComponentFixture<InfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoDialog);
    fixture.componentRef.setInput('info', { title: 'Pàgines', text: 'Cada pàgina costa 30 €' });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
