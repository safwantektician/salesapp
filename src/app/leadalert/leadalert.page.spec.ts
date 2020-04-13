import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeadalertPage } from './leadalert.page';

describe('LeadalertPage', () => {
  let component: LeadalertPage;
  let fixture: ComponentFixture<LeadalertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadalertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeadalertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

