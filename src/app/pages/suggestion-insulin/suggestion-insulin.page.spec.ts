import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuggestionInsulinPage } from './suggestion-insulin.page';

describe('SuggestionInsulinPage', () => {
  let component: SuggestionInsulinPage;
  let fixture: ComponentFixture<SuggestionInsulinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionInsulinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionInsulinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
