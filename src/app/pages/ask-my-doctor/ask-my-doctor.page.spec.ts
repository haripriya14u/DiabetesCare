import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AskMyDoctorPage } from './ask-my-doctor.page';

describe('AskMyDoctorPage', () => {
  let component: AskMyDoctorPage;
  let fixture: ComponentFixture<AskMyDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskMyDoctorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AskMyDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
