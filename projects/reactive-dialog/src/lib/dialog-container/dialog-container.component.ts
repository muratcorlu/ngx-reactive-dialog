import {
  Component, Output, Input, EventEmitter, ViewEncapsulation, HostListener,
  OnChanges, SimpleChanges, OnDestroy
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Subject } from 'rxjs';
import { DialogState } from '../dialog/dialog-state';
import { takeUntil } from 'rxjs/operators';


/**
 * Dialog container
 *
 * Example of using standalone container without *imDialogState directive
 *
 * ```html
 * <im-dialog-container *ngIf="visible">
 *   <im-dialog-title> Title </im-dialog-title>
 *   <im-dialog-content> Content </im-dialog-content>
 *   <im-dialog-footer> Buttons </im-dialog-footer>
 * </im-dialog-container>
 * ```
 */
@Component({
  selector: 'im-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger(
      'slideIn', [
        transition(':enter', [
          style({
            transform: 'translateY(-30%) translateX(-50%)',
            opacity: 0
          }),
          animate('250ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({
            transform: 'translateY(-50%) translateX(-50%)',
            opacity: 1
          }))
        ])
      ]
    )
  ]
})
export class DialogContainerComponent implements OnChanges, OnDestroy {

  /**
   * Closable or not
   * When true, backdrop click or escape keypress will close the dialog
   */
  @Input() public closable = true;

  /**
   * Dialog state object
   */
  @Input() public state: DialogState;

  /**
   * Cancel event
   */
  @Output() public cancel = new EventEmitter();

  /** Emits the value when component is destroyed */
  private destroyedSubject = new Subject<{}>();

  /** watching for changes on the object */
  public ngOnChanges(changes: SimpleChanges) {
    if (changes.state && this.state) {
      this.closable = this.state.config.closable;
      this.state.configChange.pipe(takeUntil(this.destroyedSubject)).subscribe(config => this.closable = config.closable);
    }
  }

  /** Cleans up component */
  public ngOnDestroy() {
    this.destroyedSubject.next({});
  }

  /** Close the dialog */
  public close() {
    if (this.closable) {
      this.emitClose();
    }
  }

  /** Escape key binding */
  @HostListener('document:keydown.escape') public onKeydownHandler() {
    this.close();
  }

  /** Triggers close output and cancels the state */
  private emitClose() {
    if (this.state) {
      this.state.cancel();
    }
    this.cancel.emit();
  }
}
