import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MassagePage } from './massage.page';

describe('MassagePage', () => {
  let component: MassagePage;
  let fixture: ComponentFixture<MassagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MassagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
