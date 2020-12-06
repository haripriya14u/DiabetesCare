import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDietaryPage } from './add-dietary.page';

describe('AddDietaryPage', () => {
  let component: AddDietaryPage;
  let fixture: ComponentFixture<AddDietaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDietaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDietaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
