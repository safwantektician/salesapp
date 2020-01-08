import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadactionPage } from './leadaction.page';

describe('LeadactionPage', () => {
  let component: LeadactionPage;
  let fixture: ComponentFixture<LeadactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
