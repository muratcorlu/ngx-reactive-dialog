import { CommonModule } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { DialogContainerComponent } from './dialog-container.component';
import { DialogModule } from '../dialog.module';


describe('Dialog Container Component', () => {

  let fixture: ComponentFixture<DialogContainerComponent>;
  let component: DialogContainerComponent;
  let element: HTMLElement;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, DialogModule, NoopAnimationsModule ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DialogContainerComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement.nativeElement;
      done();
    });
  });

  it('should initialize correctly', () => {
    expect(component.close).toBeFunction();
    expect(component.cancel).toBeDefined();
  });

  it('should close dialog when escape is clicked', () => {
    const e: any = new KeyboardEvent('keydown', { key: 'escape'});
    document.dispatchEvent(e);
    fixture.detectChanges();
  });

  xit('shouldnt emit close only when its closable', () => {

    const cancelEventSpy = spyOn(component.cancel, 'emit');
    const backdrop = element.querySelector('.backdrop');
    component.state = jasmine.createSpyObj('state', ['cancel']);
    component.closable = false;

    backdrop.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(cancelEventSpy).not.toHaveBeenCalled();
    expect(component.state.cancel).not.toHaveBeenCalled();

    component.closable = true;
    backdrop.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(cancelEventSpy).toHaveBeenCalled();
    expect(component.state.cancel).toHaveBeenCalled();

  });

  it('shouldnt emit close only when its states allows it to be closable', async() => {

    const cancelEventSpy = spyOn(component.cancel, 'emit');
    const backdrop = element.querySelector('.backdrop');
    component.state = jasmine.createSpyObj('state', ['cancel']);
    component.state.config = { closable: false };
    component.state.configChange = new Subject();
    component.closable = false;
    component.ngOnChanges({state: new SimpleChange(null, component.state, true)});

    backdrop.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(cancelEventSpy).not.toHaveBeenCalled();
    expect(component.state.cancel).not.toHaveBeenCalled();

    component.state.config = { closable: true };
    component.state.configChange.next({ closable: true });
    expect(component.closable).toBe(true);
    backdrop.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(cancelEventSpy).toHaveBeenCalled();
    expect(component.state.cancel).toHaveBeenCalled();

    component.ngOnDestroy();
    component.state.config = { closable: false };
    component.state.configChange.next({ closable: false });
    expect(component.closable).toBe(true);
  });

});
