import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListBeneficiaryPage } from './list-beneficiary.page';

describe('ListBeneficiaryPage', () => {
  let component: ListBeneficiaryPage;
  let fixture: ComponentFixture<ListBeneficiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBeneficiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListBeneficiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
