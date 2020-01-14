import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadacceptsuccessPage } from './leadacceptsuccess.page';

describe('LeadacceptsuccessPage', () => {
  let component: LeadacceptsuccessPage;
  let fixture: ComponentFixture<LeadacceptsuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadacceptsuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadacceptsuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
