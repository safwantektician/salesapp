import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivitylogPage } from './activitylog.page';

describe('ActivitylogPage', () => {
  let component: ActivitylogPage;
  let fixture: ComponentFixture<ActivitylogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitylogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivitylogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
