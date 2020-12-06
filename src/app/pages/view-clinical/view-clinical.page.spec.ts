import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewClinicalPage } from './view-clinical.page';

describe('ViewClinicalPage', () => {
  let component: ViewClinicalPage;
  let fixture: ComponentFixture<ViewClinicalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClinicalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewClinicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
