import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGlucosePage } from './add-glucose.page';

describe('AddGlucosePage', () => {
  let component: AddGlucosePage;
  let fixture: ComponentFixture<AddGlucosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGlucosePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGlucosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
