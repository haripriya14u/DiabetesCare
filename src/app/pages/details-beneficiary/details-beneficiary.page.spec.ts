import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsBeneficiaryPage } from './details-beneficiary.page';

describe('DetailsBeneficiaryPage', () => {
  let component: DetailsBeneficiaryPage;
  let fixture: ComponentFixture<DetailsBeneficiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBeneficiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsBeneficiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
