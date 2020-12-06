import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddClinicalPage } from './add-clinical.page';

describe('AddClinicalPage', () => {
  let component: AddClinicalPage;
  let fixture: ComponentFixture<AddClinicalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClinicalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddClinicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
