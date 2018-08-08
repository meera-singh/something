import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhistoryofselecteduserComponent } from './viewhistoryofselecteduser.component';

describe('ViewhistoryofselecteduserComponent', () => {
  let component: ViewhistoryofselecteduserComponent;
  let fixture: ComponentFixture<ViewhistoryofselecteduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewhistoryofselecteduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewhistoryofselecteduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
