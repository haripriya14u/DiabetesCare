import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewGlucosePage } from './view-glucose.page';

describe('ViewGlucosePage', () => {
  let component: ViewGlucosePage;
  let fixture: ComponentFixture<ViewGlucosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGlucosePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewGlucosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
