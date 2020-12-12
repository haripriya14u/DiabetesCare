import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsulinFormPage } from './insulin-form.page';

describe('InsulinFormPage', () => {
  let component: InsulinFormPage;
  let fixture: ComponentFixture<InsulinFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulinFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsulinFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
