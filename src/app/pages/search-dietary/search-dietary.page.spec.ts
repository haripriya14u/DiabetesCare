import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchDietaryPage } from './search-dietary.page';

describe('SearchDietaryPage', () => {
  let component: SearchDietaryPage;
  let fixture: ComponentFixture<SearchDietaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDietaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchDietaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
