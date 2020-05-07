import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectfilterPage } from './selectfilter.page';

describe('SelectfilterPage', () => {
  let component: SelectfilterPage;
  let fixture: ComponentFixture<SelectfilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectfilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectfilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
