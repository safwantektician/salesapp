import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadllistPage } from './leadllist.page';

describe('LeadllistPage', () => {
  let component: LeadllistPage;
  let fixture: ComponentFixture<LeadllistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadllistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadllistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
