import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewInsulinPage } from './view-insulin.page';

describe('ViewInsulinPage', () => {
  let component: ViewInsulinPage;
  let fixture: ComponentFixture<ViewInsulinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInsulinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewInsulinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
