import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TonesettingPage } from './tonesetting.page';

describe('TonesettingPage', () => {
  let component: TonesettingPage;
  let fixture: ComponentFixture<TonesettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonesettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TonesettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
