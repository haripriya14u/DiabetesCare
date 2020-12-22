import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPrescriptionPage } from './add-prescription.page';

describe('AddPrescriptionPage', () => {
  let component: AddPrescriptionPage;
  let fixture: ComponentFixture<AddPrescriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrescriptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPrescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
