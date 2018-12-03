import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveDialogComponent } from './reactive-dialog.component';

describe('ReactiveDialogComponent', () => {
  let component: ReactiveDialogComponent;
  let fixture: ComponentFixture<ReactiveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
