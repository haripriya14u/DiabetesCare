import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddInsulinPage } from './add-insulin.page';

describe('AddInsulinPage', () => {
  let component: AddInsulinPage;
  let fixture: ComponentFixture<AddInsulinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsulinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddInsulinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
