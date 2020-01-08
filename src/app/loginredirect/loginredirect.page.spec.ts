import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginredirectPage } from './loginredirect.page';

describe('LoginredirectPage', () => {
  let component: LoginredirectPage;
  let fixture: ComponentFixture<LoginredirectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginredirectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginredirectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
