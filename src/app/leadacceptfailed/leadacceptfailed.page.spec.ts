import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadacceptfailedPage } from './leadacceptfailed.page';

describe('LeadacceptfailedPage', () => {
  let component: LeadacceptfailedPage;
  let fixture: ComponentFixture<LeadacceptfailedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadacceptfailedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadacceptfailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
