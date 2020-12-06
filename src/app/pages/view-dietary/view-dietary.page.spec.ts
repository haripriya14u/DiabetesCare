import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDietaryPage } from './view-dietary.page';

describe('ViewDietaryPage', () => {
  let component: ViewDietaryPage;
  let fixture: ComponentFixture<ViewDietaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDietaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDietaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
