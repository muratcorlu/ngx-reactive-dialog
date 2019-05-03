import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveDialogModule } from '../reactive-dialog.module';
import { DialogState } from './dialog-state';

/**Dummy Component to test Directive */
@Component({
  template: `
  <div *ngIf="myCondition">
    <im-dialog *imDialogState="testState"><im-dialog-title>Hi</im-dialog-title></im-dialog>
  </div>
  `
})
class TestComponent {
  public testState = new DialogState();
  public myCondition = true;
}

describe('Dialog Directive *imDialogState', function () {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let body: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [ ReactiveDialogModule, CommonModule, NoopAnimationsModule ],
    }).compileComponents().then(() => {
      body = TestBed.get(DOCUMENT).body;

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
    });
  }));

  it('should open and close the dialog',  () => {
    component.testState.open();
    fixture.detectChanges();
    expect(body.querySelector('im-dialog-container')).not.toBeNull();

    component.testState.cancel();
    fixture.detectChanges();
    expect(body.querySelector('im-dialog-container')).toBeNull();

    component.testState.cancel();
    fixture.detectChanges();
  });
  it('should not close the dialog if it\'s not closable',  () => {
    component.testState.open();
    fixture.detectChanges();
    expect(body.querySelector('im-dialog-container')).not.toBeNull();

    component.testState.config = {closable: false};
    (body.querySelector('im-dialog-container .backdrop') as HTMLElement).click();

    expect(body.querySelector('im-dialog-container')).not.toBeNull();

    component.testState.config = {closable: true};
    (body.querySelector('im-dialog-container .backdrop') as HTMLElement).click();
    fixture.detectChanges();

    expect(body.querySelector('im-dialog-container')).toBeNull();
  });
  describe('should set ngOnDestroy', () => {
    it('should do nothing if not visible', () => {
      fixture.detectChanges();
      expect(body.querySelector('im-dialog-container')).toBeNull();
      component.myCondition = false;
      fixture.detectChanges();
      expect(body.querySelector('im-dialog-container')).toBeNull();
    });
    it('should hide dialog if visible', () => {
      component.testState.open();
      fixture.detectChanges();
      expect(body.querySelector('im-dialog-container')).not.toBeNull();
      component.myCondition = false;
      fixture.detectChanges();
      expect(body.querySelector('im-dialog-container')).toBeNull();

    });
  });
});
