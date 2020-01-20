import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadcallendPage } from './leadcallend.page';

describe('LeadcallendPage', () => {
  let component: LeadcallendPage;
  let fixture: ComponentFixture<LeadcallendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadcallendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadcallendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
